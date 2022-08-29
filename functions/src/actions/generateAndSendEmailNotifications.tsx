import React from 'react';
import * as admin from 'firebase-admin';
// import { render } from 'mailing-core';

import { sendMail } from '../emails';
import NotificationEmail from '../emails/NotificationEmail';
import { onConnect } from '../actions/helpers/onConnect';
// import { createTask } from './helpers/createTask';

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
  return (
    profile.email &&
    typeof profile.email === 'string' &&
    profile.email.match(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)
  );
}

async function fetchData(props: {
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

  try {
    const isConnected = await onConnect();
    if (isConnected) {
      const [appSnapshot, workspaceSnapshot, seenBySnapshot, timelineSnapshot, threadInfoSnapshot] =
        await Promise.all([appQuery, workspaceQuery, seenByQuery, timelineQuery, threadInfoQuery]);

      const app = appSnapshot.val();
      if (!isValidApp(app)) {
        console.debug('invalid app exiting', app);
        return null;
      }

      if (app.isEmailDisabled) {
        console.debug('email disabled, exiting');
        return null;
      }

      if (!app.name) {
        console.debug('could not find app.name, exiting');
        return null;
      }

      if (!app.accentColor) {
        console.debug('could not find app.accentColor, exiting');
        return null;
      }

      const workspace = workspaceSnapshot.val();
      if (!isValidWorkspace(workspace)) {
        console.debug('invalid workspace, exiting', workspace);
        return null;
      }

      if (!workspace.profiles) {
        console.debug('workspace has no profiles, exiting');
        return null;
      }

      if (!app.logoUrl) {
        console.debug('could not find app.logoUrl, exiting');
        return null;
      }

      const profileIds = Object.keys(workspace.profiles);

      if (profileIds.length === 0) {
        console.debug('workspace has no profiles, exiting');
        return null;
      }

      if (profileIds.length === 1) {
        console.debug('workspace has only one profile, exiting');
        return null;
      }

      const threadInfo = threadInfoSnapshot.val();

      if (!isThreadInfo(threadInfo)) {
        console.debug('invalid thread info, exiting', threadInfo);
        return null;
      }

      if (!threadInfo.url) {
        console.debug('no thread url, skipping', threadInfo);
        return null;
      }

      // let tasks: { [profileId: string]: Promise<void>[] } = {};

      const profileSnapshots = await Promise.all(
        profileIds.map((profileId) => db.ref(`/profiles/${appId}/${profileId}/`).get())
      );

      const profiles: { [id: string]: Profile } = {};
      for (const profileId of profileIds) {
        const profileSnapshot = profileSnapshots.find((snapshot) => snapshot.key === profileId);
        const profile = profileSnapshot?.val();
        if (isProfile(profile)) {
          profiles[profileId] = profile;
        }
      }

      console.debug('got profiles', profiles);

      const seenBy = seenBySnapshot.val() ?? {};
      if (!isValidSeenBy(seenBy)) {
        console.debug('invalid seen by data, exiting', seenBy);
        return null;
      }

      const timeline = timelineSnapshot.val();
      if (!isValidTimeline(timeline)) {
        console.debug('invalid events data, exiting', timeline);
        return null;
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
        return null;
      }

      console.debug('got creator profile', actorProfile);

      const isFirstEvent = Object.keys(timelineWithEventIds)[0] === eventId;
      console.debug('isFirstEvent', isFirstEvent);

      return {
        app,
        workspace,
        profiles,
        seenBy,
        timeline: timelineWithEventIds,
        threadInfo: threadInfoSnapshot.val(),
        eventId,
        event: _event,
        lastEventId,
        profileIds,
        actorProfile,
        isFirstEvent,
      };
    }
  } catch (error) {
    console.error('error fetching data', error);
    return null;
  }
  return null;
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

  try {
    const data = await fetchData(props);
    if (data === null) {
      return;
    }

    const {
      app,
      workspace,
      profiles,
      // seenBy,
      event,
      timeline,
      threadInfo,
      eventId,
      // lastEventId,
      profileIds,
      // actorProfile,
      // isFirstEvent,
    } = data;

    const eventIds = Object.keys(timeline);

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

        if (!canSendEmail(profiles[profileId])) {
          console.debug('cant send email', profileId);
          continue;
        }

        if (profileId === event.createdById) {
          console.debug(
            'profileId === _event.createdById skipping and setting notifiedUntil',
            profileId,
            eventId
          );
          await db.ref(`/notifiedUntil/${appId}/${workspaceId}/${profileId}`).set(eventId);
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

          // if we've never notified this user, lets start
          // from the first eventId
          if (!notifiedUntil) {
            notifyFrom = eventIds[0];
          } else if (notifiedUntil) {
            notifyFrom = eventIds[eventIds.indexOf(notifiedUntil) + 1];
          }

          if (!notifyFrom) {
            console.log('no notifyFrom, skipping', profileId);
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
            .map((eventId) => timeline[eventId])
            .filter((event) => event.type === 'message');

          const list = messageEvents.reduce<(Event & { id: string })[][]>(
            (groupedEvents, event, i) => {
              const prevEvent = timeline[messageEvents.map((e) => e.id)[i - 1]];
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
            // const file = bucket.file(
            //   `/emails/${appId}/${workspaceId}/${profileId}/${eventId}.html`
            // );
            // tasks[profileId] ||= [
            // file.save(render(mail.component).html, {
            //   gzip: true,
            //   contentType: 'text/html',
            // }),
            // db
            //   .ref(`/emails/${appId}/${workspaceId}/${threadId}/${profileId}/${eventId}`)
            //   .set({ subject, to }),
            await sendMail(mail);
            // ];
          } catch (e) {
            console.error('error setting up mail promises', e);
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
