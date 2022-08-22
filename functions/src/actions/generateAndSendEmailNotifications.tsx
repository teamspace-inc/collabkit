import React from 'react';
import * as admin from 'firebase-admin';
import { render } from 'mailing-core';

import { sendMail } from '../emails';
import NotificationEmail from '../emails/NotificationEmail';
import { onConnect } from '../actions/helpers/onConnect';

export async function generateAndSendEmailNotifications(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
}) {
  const db = admin.database();
  const storage = admin.storage();
  const bucket = storage.bucket('collabkit-dev-emails');
  const { appId, workspaceId, threadId, eventId } = props;

  console.log('generateNotification', { appId, workspaceId, threadId, eventId });

  // app name
  // app logo

  const appQuery = db.ref(`/apps/${appId}/`).get();

  const workspaceQuery = db.ref(`/workspaces/${appId}/${workspaceId}/`).get();

  const seenByQuery = db.ref(`/views/seenBy/${appId}/${workspaceId}/${threadId}/`).get();

  const eventsQuery = db.ref(`/timeline/${appId}/${workspaceId}/${threadId}`).orderByKey().get();

  const threadInfoQuery = db.ref(`/threadInfo/${appId}/${workspaceId}/${threadId}`).get();

  // try {
  const isConnected = await onConnect();
  if (isConnected) {
    try {
      const [appSnapshot, workspaceSnapshot, seenBySnapshot, eventsSnapshot, threadInfoSnapshot] =
        await Promise.all([appQuery, workspaceQuery, seenByQuery, eventsQuery, threadInfoQuery]);

      const app = appSnapshot.val();
      if (!app) {
        console.debug('could not find app, exiting');
        return;
      }

      if (app.isEmailDisabled) {
        console.debug('email disabled, exiting');
        return;
      }

      if (!app.name) {
        console.debug('could not find app.name, exiting');
        return;
      }

      if (!app.accentColor) {
        console.debug('could not find app.accentColor, exiting');
        return;
      }

      const workspace = workspaceSnapshot.val();
      console.log(workspace);

      if (!workspace) {
        console.debug('could not find workspace, exiting');
        return;
      }

      if (!workspace.profiles) {
        console.debug('workspace has no profiles, exiting');
        return;
      }

      if (!app.logoUrl) {
        console.debug('could not find app.logoUrl, exiting');
        return;
      }

      const profileIds = Object.keys(workspace.profiles);

      if (profileIds.length === 0) {
        console.debug('workspace has no profiles, exiting');
        return;
      }

      if (profileIds.length === 1) {
        console.debug('workspace has only one profile, exiting');
        return;
      }

      if (!threadInfoSnapshot.val()) {
        console.debug('no thread info, exiting');
        return;
      }

      try {
        const profileSnapshots = await Promise.all(
          profileIds.map((profileId) => db.ref(`/profiles/${appId}/${profileId}/`).get())
        );

        const profiles: { [id: string]: any } = {};
        for (const profileId of profileIds) {
          const profileSnapshot = profileSnapshots.find((snapshot) => snapshot.key === profileId);
          if (profileSnapshot) {
            profiles[profileId] = profileSnapshot.val();
          }
        }

        console.debug('got profiles', profiles);

        const seenBy = seenBySnapshot.val();
        if (!seenBy) {
          // it should at least be seenBy the message creator
          console.debug('could not find seenBy, exiting');
          return;
        }

        console.debug('got seenBy', seenBy);

        const events = eventsSnapshot.val();
        const eventIds = Object.keys(events);

        let _event = events[eventId];

        const lastEventId = Object.keys(events)[Object.keys(events).length - 1];

        console.debug('lastEventId', lastEventId);

        const actorProfile = profiles[_event.createdById];
        if (!actorProfile) {
          console.debug('could not find actor profile, exiting');
          return;
        }

        console.debug('got creator profile', actorProfile);

        const isFirstEvent = Object.keys(events)[0] === eventId;
        console.debug('isFirstEvent', isFirstEvent);

        // for workspaces we want to notify everyone in the workspace for
        // new comments note we probably want to auto-mute this at 50+ workspace members
        // otherwise things could get a bit too spammy

        // email notifs for tella go here
        if (workspaceId.toLowerCase() === 'default') {
          // to notify:
          // + everyone in the thread
          // + everyone who has been mentioned
          // - anyone who has muted the thread
          //// TODO
          // const toNotify: string[] = events
          //   .map((event: { createdById: string }) => event.createdById)
          //   // unique
          //   .filter((v: any, i: any, a: string | any[]) => a.indexOf(v) === i)
          //   // remove creator
          //   .filter((id: string) => id !== actorProfile.id);
          // console.debug('toNotify', toNotify);
          // for (const profileId of toNotify) {
          //   try {
          //     const notifiedUntil = (
          //       await db
          //         .ref(`/notifiedUntil/${appId}/${workspaceId}/${threadId}/${profileId}`)
          //         .get()
          //     ).val();
          //     if (notifiedUntil && notifiedUntil >= eventId) {
          //       console.debug('skip: already notified', profileId);
          //     }
          //   } catch (e) {
          //     console.error('error getting notifiedUntil, aborting', e);
          //   }
          // }
        } else {
          // to notify:
          // + everyone in the workspace
          // + everyone who has been mentioned
          // - anyone who has muted the workspace
          // - anyone who has muted the thread
          const threadInfo = threadInfoSnapshot.val();

          if (!threadInfo.url) {
            console.debug('no thread url, exiting');
            return;
          }

          const threadName = threadInfo.name;

          for (const profileId of profileIds) {
            if (!profiles[profileId]) {
              continue;
            }

            if (!profiles[profileId].email) {
              continue;
            }

            if (profileId === actorProfile.createdById) {
              continue;
            }

            try {
              const notifiedUntil = (
                await db.ref(`/notifiedUntil/${appId}/${workspaceId}/${profileId}`).get()
              ).val();

              let notifyFrom: string | null = null;

              // if we've never notified this user, lets
              if (!notifiedUntil) {
                notifyFrom = eventIds[0];
              } else if (notifiedUntil) {
                notifyFrom = eventIds[eventIds.indexOf(notifiedUntil) + 1];
              }

              if (!notifyFrom) {
                continue;
              }

              const newerEventIds = eventIds.slice(eventIds.indexOf(notifiedUntil) + 1);

              if (newerEventIds.length === 0) {
                console.debug('no newer events, skipping');
                continue;
              }

              const to = profiles[profileId].email;
              const from = 'reply@mail.collabkit.dev';
              const subject =
                newerEventIds.length === 1
                  ? `New comment on ${threadName}`
                  : `New comments on ${threadName}`;

              // TODO copy-paste from useTimeline
              // would be great to use the same logic here
              const messageEvents = newerEventIds
                .map((eventId) => events[eventId])
                .filter((event) => event.type === 'message');

              const list = messageEvents.reduce((groupedEvents, event, i) => {
                const prevEvent = events[messageEvents.map((e) => e.id)[i - 1]];
                if (prevEvent) {
                  if (prevEvent.createdById === event.createdById) {
                    if (
                      typeof prevEvent.createdAt === 'number' &&
                      typeof event.createdAt === 'number'
                    ) {
                      // 5 minutes before last message and same person results
                      // in a grouped message.
                      if (prevEvent.createdAt + 1000 * 60 * 5 > event.createdAt) {
                        if (groupedEvents[groupedEvents.length - 1]) {
                          groupedEvents[groupedEvents.length - 1].push(event);
                          return groupedEvents;
                        }
                      }
                    }
                  }
                }
                return groupedEvents.concat([[event]]);
              }, []);

              const component = (
                <NotificationEmail
                  openUrl={threadInfo.url}
                  accentColor={app.accentColor}
                  appLogoUrl={app.logoUrl}
                  ctaText={list.length === 1 ? 'View comment' : 'View comments'}
                  activity={list.length === 1 ? 'New comment' : 'New comments'}
                  threadName={threadName}
                  workspaceName={workspace.name}
                  productName={app.name}
                  commentList={list}
                  profiles={profiles}
                />
              );

              const mail = {
                subject,
                to,
                component,
              };

              console.log(mail.subject, mail.to);

              try {
                const file = bucket.file(
                  `/emails/${appId}/${workspaceId}/${profileId}/${eventId}.html`
                );
                await file.save(render(mail.component).html, {
                  gzip: true,
                  contentType: 'text/html',
                });
                await db
                  .ref(`/emails/${appId}/${workspaceId}/${threadId}/${profileId}/${eventId}`)
                  .set({ subject, to, bodyFileId: file.id });
                await sendMail(mail);
              } catch (e) {
                console.error('error sending mail', e);
                return;
              }

              try {
                await db
                  .ref(`/notifiedUntil/${appId}/${workspaceId}/${profileId}`)
                  .set(newerEventIds[newerEventIds.length - 1]);

                console.log('notified until', eventId, newerEventIds[newerEventIds.length - 1]);
              } catch (e) {
                console.error('error setting notifiedUntil, aborting', e);
              }
            } catch (e) {
              console.error('error getting notifiedUntil, aborting', e);
            }
          }
        }
      } catch (e) {
        console.error('error fetching profiles', e);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return null;
}

// admin.initializeApp({
//   credential: admin.credential.cert('/Users/namitchadha/collabkit-dev-service-account.json'),
//   databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app/',
// });

// generateAndSendEmailNotifications({
//   appId: '-N67qY-qlZoWmkQBPyZU',
//   eventId: '-NA5tT6WrPFAZ6PVIVfo',
//   threadId: 'your-thread-id',
//   workspaceId: 'foobar',
// })
//   .then(() => {
//     console.log('done');
//   })
//   .catch((e) => {
//     console.error('failed', e);
//   });
