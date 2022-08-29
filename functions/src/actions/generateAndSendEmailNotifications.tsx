import React from 'react';
import * as admin from 'firebase-admin';
import { render } from 'mailing-core';

import { sendMail } from '../emails';
import NotificationEmail from '../emails/NotificationEmail';
import { onConnect } from '../actions/helpers/onConnect';

type NotifiedUntilId = string | undefined;

function isValidNotifiedUntilId(data: any): data is NotifiedUntilId {
  return typeof data === 'string' || data === undefined;
}

type SeenBy = {
  [userId: string]: SeenByUser;
};

type SeenByUser = {
  seenUntilId: string;
  seenAt: number;
};

function isValidSeenByUser(data: any): data is SeenByUser {
  return (
    typeof data === 'object' &&
    'seenUntilId' in data &&
    'seenAt' in data &&
    typeof data.seenUntilId === 'string' &&
    typeof data.seenAt === 'number'
  );
}

function isValidSeenBy(data: any): data is SeenBy {
  if (typeof data !== 'object') {
    return false;
  }

  const userIdsValid = Object.keys(data).every((userId) => typeof userId === 'string');
  const userIdsHaveSeenUntilIds = Object.values(data).every((seenByUser) =>
    isValidSeenByUser(seenByUser)
  );
  return userIdsValid && userIdsHaveSeenUntilIds;
}

type App = {
  name: string;
  admins: {
    [adminId: string]: boolean;
  };
  keys: {
    [keyId: string]: boolean;
  };
  mode: 'SECURED' | 'UNSECURED';
  isEmailDisabled?: boolean;
  logoUrl?: string;
  webhook?: string;
  accentColor?: string;
};

type Event = {
  type: 'message' | 'reaction' | 'adminMessage' | 'system';
  body: string;
  system?: 'resolve' | 'reopen';
  createdAt: number;
  createdById: string;
  parentId?: string;
};

type Timeline = {
  [eventId: string]: Event;
};

type TimelineWithEventId = {
  [eventId: string]: Event & { id: string };
};

function isValidTimeline(data: any): data is Timeline {
  if (typeof data !== 'object') {
    return false;
  }

  const eventIdsValid = Object.keys(data).every((eventId) => typeof eventId === 'string');
  const eventIdsHaveEvents = Object.values(data).every((event) => isValidEvent(event));
  return eventIdsValid && eventIdsHaveEvents;
}

function isValidEvent(data: any): data is Event {
  if (typeof data !== 'object') {
    return false;
  }

  const typeValid =
    'type' in data &&
    typeof data.type === 'string' &&
    ['message', 'reaction', 'adminMessage', 'system'].includes(data.type);
  const bodyValid = 'body' in data && typeof data.body === 'string';
  const systemValid =
    'system' in data
      ? typeof data.system === 'string' && ['resolve', 'reopen'].includes(data.system)
      : true;
  const createdAtValid = 'createdAt' in data && typeof data.createdAt === 'number';
  const createdByIdValid = 'createdById' in data && typeof data.createdById === 'string';
  const parentIdValid = 'parentId' in data ? typeof data.parentId === 'string' : true;
  return (
    typeValid && bodyValid && systemValid && createdAtValid && createdByIdValid && parentIdValid
  );
}

function isValidApp(data: any): data is App {
  if (typeof data !== 'object') {
    return false;
  }

  const nameValid = 'name' in data ? typeof data.name === 'string' : true;
  const isEmailDisabledValid =
    'isEmailDisabled' in data ? typeof data.isEmailDisabled === 'boolean' : true;
  const logoUrlValid = 'logoUrl' in data ? typeof data.logoUrl === 'string' : true;
  const webhookValid = 'webhook' in data ? typeof data.webhook === 'string' : true;
  const adminsValid = 'admins' in data && typeof data.admins === 'object';
  const keysValid =
    'keys' in data &&
    typeof data.keys === 'object' &&
    Object.keys(data.keys).length > 0 &&
    Object.values(data.keys).every((value) => typeof value === 'boolean');
  const modeValid =
    'mode' in data &&
    typeof data.mode === 'string' &&
    (data.mode === 'SECURED' || data.mode === 'UNSECURED');

  const accentColorValid = 'accentColor' in data ? typeof data.accentColor === 'string' : true;

  return (
    nameValid &&
    isEmailDisabledValid &&
    logoUrlValid &&
    webhookValid &&
    adminsValid &&
    keysValid &&
    modeValid &&
    accentColorValid
  );
}

type Profile = {
  name?: string;
  avatar?: string;
  email?: string;
  color?: string;
};

function isProfile(data: any): data is Profile {
  return (
    typeof data === 'object' &&
    ('name' in data || 'avatar' in data || 'email' in data || 'color' in data)
  );
}

type Workspace = {
  name?: string;
  profiles: {
    [userId: string]: boolean;
  };
};

function isValidWorkspace(data: any): data is Workspace {
  if (typeof data !== 'object') {
    return false;
  }

  const profilesValid =
    'profiles' in data &&
    Object.keys(data.profiles).every((userId) => typeof userId === 'string') &&
    Object.values(data.profiles).every((value) => value === true);

  const nameValid = 'name' in data ? typeof data.name === 'string' : true;

  return profilesValid && nameValid;
}

type ThreadInfo = {
  name?: string;
  url?: string;
};

function isThreadInfo(data: any): data is ThreadInfo {
  return typeof data === 'object' &&
    'url' in data &&
    'url' in data &&
    typeof data.url === 'string' &&
    'name' in data
    ? typeof data.name === 'string'
    : true;
}

function canSendEmail(profile: Profile) {
  profile.email &&
    typeof profile.email === 'string' &&
    profile.email.match(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/);
}

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

  const timelineQuery = db.ref(`/timeline/${appId}/${workspaceId}/${threadId}`).orderByKey().get();

  const threadInfoQuery = db.ref(`/threadInfo/${appId}/${workspaceId}/${threadId}`).get();

  // try {
  const isConnected = await onConnect();
  if (isConnected) {
    try {
      const [appSnapshot, workspaceSnapshot, seenBySnapshot, timelineSnapshot, threadInfoSnapshot] =
        await Promise.all([appQuery, workspaceQuery, seenByQuery, timelineQuery, threadInfoQuery]);

      const app = appSnapshot.val();
      if (!isValidApp(app)) {
        console.debug('invalid app exiting', app);
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
      if (!isValidWorkspace(workspace)) {
        console.debug('invalid workspace, exiting', workspace);
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

        const seenBy = seenBySnapshot.val() ?? {};
        if (!isValidSeenBy(seenBy)) {
          console.debug('invalid seen by data, exiting', seenBy);
          return;
        }

        const timeline = timelineSnapshot.val();
        if (!isValidTimeline(timeline)) {
          console.debug('invalid events data, exiting', timeline);
          return;
        }

        const timelineWithEventIds: { [eventId: string]: Event & { id: string } } = {};
        for (const eventId in timeline) {
          timelineWithEventIds[eventId] = { ...timeline[eventId], id: eventId };
        }

        const eventIds = Object.keys(timelineWithEventIds);

        let _event = timelineWithEventIds[eventId];

        const lastEventId = Object.keys(timelineWithEventIds)[Object.keys(timeline).length - 1];

        console.debug('lastEventId', lastEventId);

        const actorProfile = profiles[_event.createdById];
        if (!actorProfile) {
          console.debug('could not find actor profile, exiting');
          return;
        }

        console.debug('got creator profile', actorProfile);

        const isFirstEvent = Object.keys(timelineWithEventIds)[0] === eventId;
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

          if (!isThreadInfo(threadInfo)) {
            console.debug('invalid thread info, exiting', threadInfo);
            return;
          }

          const threadName = threadInfo.name;

          for (const profileId of profileIds) {
            if (!profiles[profileId]) {
              console.debug('no profile found skipping', profileId);
              continue;
            }

            if (!profiles[profileId].email) {
              console.debug('no profile email found skipping', profileId);
              continue;
            }

            if (profileId === actorProfile.createdById) {
              console.debug('profileId === actorProfile.createdById skipping', profileId);
              continue;
            }

            try {
              const notifiedUntil = (
                await db.ref(`/notifiedUntil/${appId}/${workspaceId}/${profileId}`).get()
              ).val();

              if (!isValidNotifiedUntilId(notifiedUntil)) {
                console.debug('invalid notifiedUntil, skipping', notifiedUntil);
                continue;
              }

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

              const newerEventIds = eventIds.slice(eventIds.indexOf(notifyFrom) + 1);

              if (newerEventIds.length === 0) {
                console.debug('no newer events, skipping');
                continue;
              }

              const to = profiles[profileId].email;
              const from = 'noreply@mail.collabkit.dev';
              const subject =
                newerEventIds.length === 1
                  ? `New comment on ${threadName}`
                  : `New comments on ${threadName}`;

              // TODO copy-paste from useTimeline
              // would be great to use the same logic here
              const messageEvents = newerEventIds
                .map((eventId) => timelineWithEventIds[eventId])
                .filter((event) => event.type === 'message');

              const list = messageEvents.reduce<(Event & { id: string })[][]>(
                (groupedEvents, event, i) => {
                  const prevEvent = timelineWithEventIds[messageEvents.map((e) => e.id)[i - 1]];
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
                  const toReturn = groupedEvents.concat([[event]]) as (Event & { id: string })[][];
                  return toReturn;
                },
                []
              );

              if (!threadInfo.url) {
                console.debug('no thread url, skipping', threadInfo);
                continue;
              }

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
