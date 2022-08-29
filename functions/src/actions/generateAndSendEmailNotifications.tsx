import React from 'react';
import * as admin from 'firebase-admin';

import { sendMail } from '../emails';
import NotificationEmail from '../emails/NotificationEmail';
import { onConnect } from '../actions/helpers/onConnect';

import type { Event, Profile } from '../types';
import { isValidNotifiedUntilId } from './helpers/isValidNotifiedUntilId';
import { isValidSeenBy } from './helpers/isValidSeenBy';
import { isValidTimeline } from './helpers/isValidTimeline';
import { isValidApp } from './helpers/isValidApp';
import { isProfile } from './helpers/isProfile';
import { isValidWorkspace } from './helpers/isValidWorkspace';
import { isThreadInfo } from './helpers/isThreadInfo';
import { canSendEmail } from './helpers/canSendEmail';
import { groupedEvents } from './helpers/groupedEvents';

type Data = Exclude<Awaited<ReturnType<typeof fetchData>>, null>;

function setNotifiedUntil(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  profileId: string;
  eventId: string;
}) {
  const db = admin.database();
  return db
    .ref(`/notifiedUntil/${props.appId}/${props.workspaceId}/${props.profileId}`)
    .set(props.eventId);
}

async function fetchProfileSpecificData(props: {
  data: Data;
  appId: string;
  threadId: string;
  workspaceId: string;
  profileId: string;
}) {
  const { appId, workspaceId, profileId, data } = props;

  if (!data.profiles[profileId]) {
    console.debug('no profile found skipping', profileId);
    return null;
  }

  if (!data.profiles[profileId].email) {
    console.debug('no profile email found skipping', profileId);
    return null;
  }

  if (!canSendEmail(data.profiles[profileId])) {
    console.debug('cant send email', profileId);
    return null;
  }

  const db = admin.database();
  const notifiedUntil = (
    await db.ref(`/notifiedUntil/${appId}/${workspaceId}/${profileId}`).get()
  ).val();

  if (!isValidNotifiedUntilId(notifiedUntil)) {
    console.debug('invalid notifiedUntil, skipping', notifiedUntil);
    return null;
  }

  let notifyFrom: string | null = null;

  const eventIds = Object.keys(data.timeline);

  // if we've never notified this user,
  // lets start from the first eventId
  if (!notifiedUntil) {
    notifyFrom = eventIds[0];
  } else if (notifiedUntil) {
    notifyFrom = eventIds[eventIds.indexOf(notifiedUntil) + 1];
  }

  if (!notifyFrom) {
    console.log('no notifyFrom, skipping', profileId);
    return null;
  }

  const newerEventIds = eventIds.slice(eventIds.indexOf(notifyFrom) + 1);

  if (newerEventIds.length === 0) {
    console.debug('no newer events, skipping');
    return null;
  }
  // TODO copy-paste from useTimeline
  // would be great to use the same logic here
  const messageEvents = newerEventIds
    .map((eventId) => data.timeline[eventId])
    .filter((event) => event.type === 'message');

  const list = groupedEvents(messageEvents, data.timeline);

  return {
    notifiedUntil,
    notifyFrom,
    list,
    messageEvents,
    newerEventIds,
  };
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

  console.log('fetchData', { appId, workspaceId, threadId, eventId });

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
        threadInfo,
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

async function sendMailForProfile(props: {
  eventId: string;
  appId: string;
  workspaceId: string;
  profileId: string;
  threadId: string;
  data: Data;
}) {
  const { eventId, appId, workspaceId, profileId, threadId, data } = props;
  const profileData = await fetchProfileSpecificData({
    appId,
    workspaceId,
    threadId,
    profileId,
    data,
  });

  if (!profileData) {
    return null;
  }

  const { newerEventIds, list } = profileData;

  if (profileId === data.event.createdById) {
    console.debug(
      'profileId === _event.createdById skipping and setting notifiedUntil',
      profileId,
      eventId
    );
    await setNotifiedUntil({ appId, workspaceId, threadId, profileId, eventId });
    return null;
  }

  const to = data.profiles[profileId].email;
  // const from = 'noreply@mail.collabkit.dev';

  const threadName = data.threadInfo.name;

  // there's a bug here.
  const subject =
    newerEventIds.length === 1 ? `New comment on ${threadName}` : `New comments on ${threadName}`;

  const component = (
    <NotificationEmail
      openUrl={data.threadInfo.url}
      accentColor={data.app.accentColor}
      appLogoUrl={data.app.logoUrl}
      ctaText={list.length === 1 ? 'View comment' : 'View comments'}
      activity={list.length === 1 ? 'New comment' : 'New comments'}
      threadName={data.threadInfo.name}
      workspaceName={data.workspace.name}
      productName={data.app.name}
      commentList={list}
      profiles={data.profiles}
    />
  );

  const mail = {
    subject,
    to,
    component,
  };

  console.log(mail.subject, mail.to);

  const newNotifiedUntilId = newerEventIds[newerEventIds.length - 1];

  if (!newNotifiedUntilId) {
    console.debug('no newNotifiedUntilId, exiting');
    return null;
  }

  try {
    await sendMail(mail);
  } catch (e) {
    console.error('sendMail failed', e);
    return null;
  }

  return setNotifiedUntil({
    appId,
    workspaceId,
    profileId,
    threadId,
    eventId: newNotifiedUntilId,
  });
}

export async function generateAndSendEmailNotifications(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
}) {
  const { appId, workspaceId, threadId, eventId } = props;

  console.log('generateNotification', { appId, workspaceId, threadId, eventId });

  const data = await fetchData(props);
  if (data === null) {
    return;
  }

  const { profileIds } = data;

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

    // for all the profiles in this workspace,
    // generate and send an email notification
    await Promise.allSettled(
      profileIds.map(async (profileId) => {
        return sendMailForProfile({
          eventId,
          appId,
          workspaceId,
          profileId,
          threadId,
          data,
        });
      })
    );
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
