import React from 'react';
import * as admin from 'firebase-admin';

import { sendMail } from '../emails';
import NotificationEmail from '../emails/NotificationEmail';
import { onConnect } from './data/onConnect';
import { setNotifiedUntil } from './data/setNotifiedUntil';
import { fetchWorkspaceProfiles } from './data/fetchWorkspaceProfiles';
import { fetchThreadInfo } from './data/fetchThreadInfo';
import { getThreadProfiles } from './helpers/getThreadProfiles';
import { fetchWorkspaceName } from './data/fetchWorkspaceName';
import { fetchTimeline } from './data/fetchTimeline';
import { fetchProfiles } from './data/fetchProfiles';
import { fetchApp } from './data/fetchApp';
import { App, Event, Profile, SeenBy, ThreadInfo, TimelineWithEventId } from '../types';
import { isAppNotifiable } from './helpers/isAppNotifiable';
import { canSendEmail } from './helpers/canSendEmail';
import { fetchNotifiedUntilId } from './data/fetchNotifiedUntilId';
import { groupedEvents } from './helpers/groupedEvents';
import { fetchIsMuted } from './data/fetchIsMuted';
import { fetchSeenBy } from './data/fetchSeenBy';
import uniq from 'lodash.uniq';
import { fetchApiKey } from './data/fetchApiKey';

async function sendMailForProfile(props: {
  eventId: string;
  appId: string;
  apiKey: string;
  workspaceId: string;
  profileId: string;
  threadId: string;
  app: App;
  threadInfo: ThreadInfo;
  workspaceName: string | undefined;
  profiles: { [userId: string]: Profile };
  timeline: TimelineWithEventId;
  event: Event;
  seenBy: SeenBy | null;
}) {
  const {
    eventId,
    appId,
    workspaceId,
    profileId,
    threadId,
    timeline,
    profiles,
    app,
    threadInfo,
    workspaceName,
    event,
    seenBy,
  } = props;
  if (!profiles[profileId]) {
    console.debug('no profile found skipping', profileId);
    return null;
  }

  if (!profiles[profileId].email) {
    console.debug('no profile email found skipping', profileId);
    return null;
  }

  if (!canSendEmail(profiles[profileId])) {
    console.debug('cant send email', profileId);
    return null;
  }

  const isMuted = await fetchIsMuted({ appId, workspaceId, profileId, threadId });

  if (isMuted) {
    console.debug('muted', profileId);
    return null;
  }

  const notifiedUntilId = await fetchNotifiedUntilId({ appId, workspaceId, profileId, threadId });

  const eventIds = Object.keys(timeline);

  let notifyFrom = !notifiedUntilId ? eventIds[0] : eventIds[eventIds.indexOf(notifiedUntilId) + 1];

  if (!notifyFrom) {
    console.log('no notifyFrom, skipping', profileId);
    return null;
  }

  const notifyAboutEventIds = eventIds.slice(eventIds.indexOf(notifyFrom));

  if (seenBy?.[profileId]?.seenUntilId) {
    const index = notifyAboutEventIds.indexOf(seenBy[profileId]?.seenUntilId);
    if (index > 0) {
      // remove events that have been seen by the user
      notifyAboutEventIds.splice(0, index);
    }
  }

  if (notifyAboutEventIds.length === 0) {
    console.debug('no events to notify about, skipping');
    return null;
  }

  const messageEvents = notifyAboutEventIds
    .map((eventId) => timeline[eventId])
    .filter((event) => event.type === 'message');

  const list = groupedEvents(messageEvents, timeline);

  const to = profiles[profileId].email;

  const mentionedInEventId = notifyAboutEventIds.find(
    (eventId) => timeline[eventId]?.mentions?.[profileId]
  );

  const mentionedInEvent = mentionedInEventId ? timeline[mentionedInEventId] : null;

  const mentionedBy = mentionedInEvent ? profiles[mentionedInEvent.createdById] : null;

  const didMentionSelf = mentionedInEventId && mentionedInEvent?.createdById === profileId;

  if (profileId === event.createdById && !didMentionSelf) {
    console.debug(
      'profileId === _event.createdById skipping and setting notifiedUntil',
      profileId,
      eventId
    );
    await setNotifiedUntil({ appId, workspaceId, threadId, profileId, notifiedUntilId: eventId });
    return null;
  } else if (didMentionSelf) {
    console.log('didMentionSelf', profileId);
  }

  const isReply = uniq(messageEvents.map((event) => event.createdById)).length > 1;

  const eventCreator = profiles[event.createdById];

  if (!eventCreator) {
    console.debug('no eventCreator found, skipping', profileId);
    return null;
  }

  let entity = null;
  let action = null;
  let preposition = 'in';
  let actor = null;

  if (threadInfo.name) {
    preposition = 'on';
    entity = threadInfo.name;
  } else if (workspaceId.toLowerCase() === 'default') {
    preposition = 'in';
    entity = app.name;
  } else if (workspaceName) {
    preposition = 'in';
    entity = workspaceName;
  } else {
    entity = '';
  }

  if (mentionedBy && mentionedBy.name) {
    action = 'mentioned you in a comment';
    actor = mentionedBy.name;
  } else if (isReply && eventCreator.name) {
    action = 'replied to a comment';
    actor = eventCreator.name;
  } else if (eventCreator.name) {
    actor = eventCreator.name;
    action = 'added a comment';
  } else {
    actor = notifyAboutEventIds.length > 1 ? 'New comments' : 'New comment';
    action = '';
  }

  const subject = [actor, action, preposition, entity].filter((part) => part.length > 0).join(' ');

  const unsubscribeToken = await admin.auth().createCustomToken(props.apiKey, {
    // These are all prefixed 'unsub' to distinguish them from claims in secure mode tokens.
    unsubAppId: appId,
    unsubWorkspaceId: workspaceId,
    unsubProfileId: profileId,
    unsubThreadId: threadId,
  });

  if (!threadInfo.url) {
    return null;
  }

  const component = (
    <NotificationEmail
      actor={actor}
      action={action}
      entity={entity}
      preposition={preposition}
      ctaText={list.length === 1 ? 'View comment' : 'View comments'}
      openUrl={threadInfo.url}
      accentColor={app.accentColor}
      appLogoUrl={app.logoUrl}
      commentList={list}
      profiles={profiles}
      unsubscribeToken={unsubscribeToken}
    />
  );

  const mail = {
    subject,
    to,
    component,
  };

  console.log(mail.subject, mail.to);

  const newNotifiedUntilId = notifyAboutEventIds[notifyAboutEventIds.length - 1];

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
    notifiedUntilId: newNotifiedUntilId,
  });
}

export async function generateAndSendEmailNotifications(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  eventId: string;
}) {
  const { appId, workspaceId, threadId, eventId } = props;

  console.log('fetchData', { appId, workspaceId, threadId, eventId });

  const isConnected = await onConnect();
  if (isConnected) {
    const { app } = await fetchApp({ appId });

    if (!isAppNotifiable({ app })) {
      console.debug('app is not notifiable, exiting');
      return null;
    }

    let workspaceName: string | undefined = undefined;
    try {
      workspaceName = (await fetchWorkspaceName({ appId, workspaceId })).workspaceName;
    } catch (e) {
      console.error('fetchWorkspaceName failed', e);
    }

    const { timeline } = await fetchTimeline({ appId, workspaceId, threadId });
    const { threadInfo } = await fetchThreadInfo({ appId, workspaceId, threadId });

    const threadOnly = app.defaultNotificationPreference === 'threadOnly';

    const profileIds = threadOnly
      ? getThreadProfiles({ timeline, threadInfo })
      : await fetchWorkspaceProfiles({
          appId,
          workspaceId,
        });

    console.debug('threadOnly', threadOnly, profileIds);

    if (profileIds.length === 0) {
      console.debug('0 profileIds, exiting');
      return null;
    }

    if (profileIds.length === 1) {
      console.debug('1 profileIds, exiting');
      return null;
    }

    const { profiles } = await fetchProfiles({ appId, profileIds });

    console.debug('fetched profiles', profiles);

    let event = timeline[eventId];

    const createdByProfile = profiles[event.createdById];
    if (!createdByProfile) {
      console.debug('could not find profiles[event.createdById], exiting');
      return null;
    }

    console.log('generateNotification', { appId, workspaceId, threadId, eventId });

    const seenBy = await fetchSeenBy({ appId, workspaceId, threadId });

    const apiKey = await fetchApiKey({ appId });

    await Promise.allSettled(
      profileIds.map((profileId) =>
        sendMailForProfile({
          appId,
          apiKey,
          eventId,
          profileId,
          threadId,
          workspaceId,
          app,
          threadInfo,
          workspaceName,
          profiles,
          timeline,
          event,
          seenBy,
        })
      )
    );
  }

  return null;
}

// import os from 'os';
// import path from 'path';
// admin.initializeApp({
//   credential: admin.credential.cert(path.join(os.homedir(), 'collabkit-dev-service-account.json')),
//   databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app/',
// });
//
// generateAndSendEmailNotifications({
//   appId: '000Bit2tYBWjC5eXcItqH',
//   eventId: '',
//   threadId: 'test-2022-11-30',
//   workspaceId: 'collabkit',
// })
//   .then(() => {
//     console.log('done');
//   })
//   .catch((e) => {
//     console.error('failed', e);
//   });
