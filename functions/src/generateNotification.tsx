import React from 'react';
import * as admin from 'firebase-admin';

// const serviceAccount = require('/Users/namitchadha/collabkit-dev-service-account.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
// });

// used to test and develop locally

const db = admin.database();

const CONNECTION_TIMEOUT_MS = 2000;

import { sendMail } from './emails';
import NotificationEmail from './emails/NotificationEmail';

// export type TimelineEvent = {
//   type: 'message' | 'reaction' | 'adminMessage' | 'system';
//   body: string;
//   system?: 'resolve' | 'reopen';
//   createdAt: number | object;
//   createdById: string;
//   parentId?: string;
// };

// export type WithName<T> = T & {
//   name: string;
// };

// export type WithID<T> = T & {
//   id: string;
// };

// type BasicProfile = {
//   name?: string | null;
//   avatar?: string | null;
//   email?: string | null;
// };

// interface Profile extends BasicProfile {}

// type Events = {
//   [eventId: string]: TimelineEvent;
// };

// interface SeenBy {
//   [userId: string]: { seenAt: number; seenUntilId: string };
// }

// type InApp<A> = {
//   [appId: string]: A;
// };

// type InWorkspace<W> = {
//   [workspaceId: string]: W;
// };

// type InThread<T> = {
//   [threadId: string]: T;
// };

// type InUser<U> = {
//   [userId: string]: U;
// };

// type Workspace = {
//   name?: string;
//   profiles?: InUser<BasicProfile>;
// };

// type App = {
//   name?: string;
//   admins: {
//     [uid: string]: true;
//   };
//   keys: {
//     [key: string]: true;
//   };
//   mode: 'UNSECURED' | 'SECURED';
//   isEmailDisabled?: boolean;
// };

// type ThreadInfo = {
//   name?: string;
//   url?: string;
// };

// type Seen = {
//   seenAt: number;
//   seenUntilId: string;
// };

// type Workspaces = InApp<InWorkspace<Workspace>>;
// type Apps = InApp<App>;
// type Profiles = InApp<InUser<BasicProfile>>;
// type ThreadInfos = InApp<InWorkspace<InThread<ThreadInfo>>>;
// type Timelines = InApp<InWorkspace<InThread<TimelineEvent>>>;
// type NotifiedUntils = InApp<InWorkspace<InThread<InUser<string>>>>;
// type Seens = InApp<InUser<InWorkspace<InThread<Seen>>>>;
// type Inbox = InApp<InWorkspace<InThread<InUser<string>>>>;

export function onConnect() {
  return new Promise((resolve, reject) => {
    let timeoutID = setTimeout(() => {
      reject('timed out');
    }, CONNECTION_TIMEOUT_MS);
    db.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val()) {
        clearTimeout(timeoutID);
        resolve(true);
      }
    });
  });
}

// function isProfile(o: any): o is BasicProfile {
//   return false;
// }

// function isWorkspace(o: any): o is Workspace {
//   return (
//     o !== null &&
//     typeof o === 'object' &&
//     Object.hasOwnProperty.call(o, 'profiles') &&
//     Object.keys(o.profiles) &&
//     Object.values(o.profiles).every(isProfile)
//   );
// }

export async function generateNotification(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
}) {
  const { appId, workspaceId, threadId, eventId } = props;

  console.log('generateNotification', { appId, workspaceId, threadId, eventId });

  const isEmailDisabledQuery = db.ref(`/apps/${appId}/isEmailDisabled/`).get();

  const workspaceQuery = db.ref(`/workspaces/${appId}/${workspaceId}/`).get();

  const seenByQuery = db.ref(`/views/seenBy/${appId}/${workspaceId}/${threadId}/`).get();

  const eventsQuery = db.ref(`/timeline/${appId}/${workspaceId}/${threadId}`).orderByKey().get();

  const threadInfoQuery = db.ref(`/threadInfo/${appId}/${workspaceId}/${threadId}`).get();

  try {
    const isConnected = await onConnect();
    if (isConnected) {
      try {
        const [
          isEmailDisabledSnapshot,
          workspaceSnapshot,
          seenBySnapshot,
          eventsSnapshot,
          threadInfoSnapshot,
        ] = await Promise.all([
          isEmailDisabledQuery,
          workspaceQuery,
          seenByQuery,
          eventsQuery,
          threadInfoQuery,
        ]);

        if (isEmailDisabledSnapshot.val()) {
          console.debug('app has email disabled, exiting');
          return;
        }

        const workspace = workspaceSnapshot.val();
        if (!workspace) {
          console.debug('could not find workspace, exiting');
          return;
        }

        if (!workspace.profiles) {
          console.debug('workspace has no profiles, exiting');
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

          console.log('lastEventId', lastEventId);

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
                  console.log('no newer events, skipping');
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
                    activity={list.length === 1 ? 'New comment' : 'New comments'}
                    threadName={threadName}
                    workspaceName={workspace.name}
                    productName={'CollabKit'}
                    commentList={list}
                    profiles={profiles}
                  />
                );

                const mail = {
                  subject,
                  to,
                  component,
                };

                try {
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
  } catch (e) {
    console.error('failed to connect to firebase', e);
  }
  return null;
}

// generateNotification({
//   eventId: '-N9GhLqDQi8utjnYBuJe',
//   threadId: 'your-thread-id',
//   workspaceId: 'acme',
//   appId: '-N67qY-qlZoWmkQBPyZU',
// }).then(console.log);
