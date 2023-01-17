import {
  DataSnapshot,
  get,
  limitToLast,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  onChildRemoved,
  onValue,
  orderByChild,
  push,
  query,
  remove,
  serverTimestamp,
  set,
  update,
} from 'firebase/database';

import type {
  Event,
  OptionalWorkspaceProps,
  Subscriptions,
  ThreadInfo,
  ThreadMeta,
  Sync,
} from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';

import { subscribeThreadIsTyping } from './subscribeThreadIsTyping';
import { subscribeThreadSeenBy } from './subscribeThreadSeenBy';
import { subscribeTimeline } from './subscribeTimeline';
import { ref, timelineRef, userTypingRef } from './refs';

import { initializeApp } from 'firebase/app';
import {
  eventToObject,
  idArrayToObject,
  snapshotToEvent,
  snapshotToProfile,
  snapshotToUser,
} from './converters';

export function initFirebase(options = { test: false }) {
  initializeApp(
    options.test
      ? {
          apiKey: 'AIzaSyBj5LhfGbP_UrXYOTzJK5e70iZuI-itsxc',
          authDomain: 'collabkit-test.firebaseapp.com',
          databaseURL: 'https://collabkit-test-default-rtdb.europe-west1.firebasedatabase.app',
          projectId: 'collabkit-test',
          storageBucket: 'collabkit-test.appspot.com',
          messagingSenderId: '847051916849',
          appId: '1:847051916849:web:417a95d387d2e3d8f57710',
        }
      : {
          apiKey: 'AIzaSyDYl8MwTEgsIzXO7EHgBlvuN5BLVJqPZ6k',
          authDomain: 'collabkit-dev.firebaseapp.com',
          databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
          projectId: 'collabkit-dev',
          storageBucket: 'collabkit-dev.appspot.com',
          messagingSenderId: '927079647438',
          appId: '1:927079647438:web:3535f7ba40a758167ee89f',
        },
    'CollabKit'
  );
}

export class FirebaseSync implements Sync.SyncAdapter {
  constructor(options = { test: false }) {
    initFirebase(options);
  }

  movePin(params: {
    appId: string;
    objectId: string;
    workspaceId: string;
    pinId: string;
    x: number;
    y: number;
  }): Promise<void> {
    const { appId, objectId, workspaceId, pinId, x, y } = params;
    const pinPath = ref.path`/pins/${appId}/${workspaceId}/${objectId}/${pinId}`;
    const openPinPath = ref.path`/views/openPins/${appId}/${workspaceId}/${objectId}/${pinId}`;
    const updates = {
      [`${pinPath}/x`]: x,
      [`${pinPath}/y`]: y,
      [`${openPinPath}/x`]: x,
      [`${openPinPath}/y`]: y,
    };
    return update(ref`/`, updates);
  }

  async savePin(params: {
    appId: string;
    workspaceId: string;
    objectId: string;
    threadId: string;
    x: number;
    y: number;
  }): Promise<string | null> {
    const { appId, workspaceId, objectId, threadId, x, y } = params;
    const pin = {
      threadId,
      x,
      y,
    };
    const pinRef = await push(ref`/pins/${appId}/${workspaceId}/${objectId}`, pin);
    const pinId = pinRef.key;
    if (!pinId) return null;
    console.log('pinRef.key', pinRef.key);
    await set(ref`/views/openPins/${appId}/${workspaceId}/${objectId}/${pinId}`, pin);
    return pinId;
  }

  async deletePin(params: {
    appId: string;
    workspaceId: string;
    objectId: string;
    pinId: string;
  }): Promise<void> {
    const updates = {
      [ref.path`/pins/${params.appId}/${params.workspaceId}/${params.objectId}/${params.pinId}`]:
        null,
      [ref.path`/views/openPins/${params.appId}/${params.workspaceId}/${params.objectId}/${params.pinId}`]:
        null,
    };
    return update(ref`/`, updates);
  }

  subscribeOpenPins(params: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    callback: (pins: { [objectId: string]: { [pinId: string]: { x: number; y: number } } }) => void;
  }): Subscriptions {
    params.subs[`pins-${params.appId}-${params.workspaceId}`] ||= onValue(
      ref`/views/openPins/${params.appId}/${params.workspaceId}`,
      (snapshot) => {
        const pins = snapshot.val();
        params.callback(pins || {});
      }
    );
    return params.subs;
  }

  saveThreadInfo(data: {
    appId: string;
    workspaceId: string;
    threadId: string;
    isOpen: boolean;
    info?: ThreadInfo;
  }): Promise<void> {
    const values = {
      [ref.path`/threadInfo/${data.appId}/${data.workspaceId}/${data.threadId}`]: data.info
        ? {
            ...data.info,
            defaultSubscribers: idArrayToObject(data.info.defaultSubscribers),
          }
        : null,

      // there's a pitfall here, if meta is null the thread will not be marked as open...
      // we should keep info separate or just say it has no info here
      [ref.path`/views/openThreads/${data.appId}/${data.workspaceId}/${data.threadId}`]: data.isOpen
        ? { meta: data.info?.meta ?? null }
        : null,
    };
    return update(ref`/`, values);
  }

  saveWorkspace(params: {
    appId: string;
    workspaceId: string;
    workspace?: OptionalWorkspaceProps | null;
  }) {
    if (
      params.workspace &&
      params.workspace.name &&
      // setting name to null deletes it
      (typeof params.workspace.name === 'string' || params.workspace.name === null)
    ) {
      return set(
        ref`/workspaces/${params.appId}/${params.workspaceId}/name/`,
        params.workspace.name
      );
    } else {
      return Promise.resolve();
    }
  }

  shouldAuthenticate(): boolean {
    return true;
  }

  serverTimestamp(): object {
    return serverTimestamp();
  }

  async saveProfile(data: {
    appId: string;
    userId: string;
    workspaceId: string;
    profile: Sync.ServerProfile;
  }): Promise<void> {
    const { appId, userId, workspaceId, profile } = data;
    try {
      await set(ref`/profiles/${appId}/${userId}`, profile);
    } catch (e) {
      console.error('CollabKit: failed to set profile', e);
    }

    try {
      await set(ref`/workspaces/${appId}/${workspaceId}/profiles/${userId}`, true);
    } catch (e) {
      console.error('CollabKit: failed to join workspace', e);
    }
  }

  async getProfile(params: { appId: string; userId: string }) {
    const snapshot = await get(ref`/profiles/${params.appId}/${params.userId}`);
    return snapshotToProfile(snapshot);
  }

  async saveEvent({
    appId,
    workspaceId,
    threadId,
    event,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
    event: Event;
  }): Promise<{ id: string }> {
    const eventRef = await push(timelineRef(appId, workspaceId, threadId), eventToObject(event));
    if (!eventRef.key) {
      throw new Error('CollabKit: failed to save event');
    }
    return { id: eventRef.key };
  }

  markResolved({
    appId,
    workspaceId,
    threadId,
    pin,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
    pin?: {
      objectId: string;
      pinId: string;
    };
  }) {
    const updates = {
      [ref.path`/views/openThreads/${appId}/${workspaceId}/${threadId}`]: null,
    };

    if (pin) {
      // clear open pins for this thread
      updates[ref.path`/views/openPins/${appId}/${workspaceId}/${pin.objectId}/${pin.pinId}`] =
        null;
    }

    return update(ref`/`, updates);
  }

  async markSeen({
    appId,
    userId,
    workspaceId,
    threadId,
    eventId,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    eventId: string;
  }): Promise<void> {
    const data = { seenUntilId: eventId, seenAt: serverTimestamp() };
    await update(ref`/`, {
      [ref.path`/seen/${appId}/${userId}/${workspaceId}/${threadId}/`]: data,
      [ref.path`/views/seenBy/${appId}/${workspaceId}/${threadId}/${userId}`]: data,
    });
  }

  async startTyping({
    appId,
    userId,
    workspaceId,
    threadId,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void> {
    await set(userTypingRef(appId, workspaceId, threadId, userId), true);
  }

  async stopTyping({
    appId,
    userId,
    workspaceId,
    threadId,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }): Promise<void> {
    await remove(userTypingRef(appId, workspaceId, threadId, userId));
  }

  async getIsTyping({
    appId,
    userId,
    workspaceId,
    threadId,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }) {
    const snapshot = await get(userTypingRef(appId, workspaceId, threadId, userId));
    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val();
  }

  async sendMessage({
    appId,
    userId,
    workspaceId,
    threadId,
    preview,
    event,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    preview: string;
    event: Event;
  }): Promise<{ id: string }> {
    // generate an id for the message
    const eventRef = await push(timelineRef(appId, workspaceId, threadId));

    const id = eventRef.key;

    if (!id) {
      throw new Error('failed to gen push ref to timeline');
    }

    let data: { [key: string]: any } = {
      [ref.path`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]:
        eventToObject(event),
      [ref.path`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
        ...eventToObject(event),
        id,
        body: preview,
        name: threadId,
        mentions: event.mentions ?? null,
      },
      [ref.path`/views/threadProfiles/${appId}/${workspaceId}/${threadId}/${userId}`]: true,
    };

    // write the data to firebase
    try {
      await update(ref`/`, data);
    } catch (e: any) {
      const error = new Error('failed to write msg: ' + e.message);
      error.stack += e.stack;
      throw error;
    }
    return { id };
  }

  subscribeSeen({
    appId,
    userId,
    workspaceId,
    subs,
    onSeenChange,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    subs: Subscriptions;
    onSeenChange: Sync.SeenEventHandler;
  }): void {
    const seenQuery = query(
      ref`/seen/${appId}/${userId}/${workspaceId}`,
      orderByChild('seenUntilId'),
      limitToLast(100)
    );

    function childCallback(snapshot: DataSnapshot) {
      const threadId = snapshot.key && FirebaseId.decode(snapshot.key);
      if (threadId && workspaceId) {
        const { seenUntilId } = snapshot.val();
        onSeenChange({ threadId, seenUntilId });
      }
    }

    function onError(e: Error) {
      console.error({ e });
    }

    subs[`${appId}-${workspaceId}-seen-added`] ||= onChildAdded(seenQuery, childCallback, onError);

    subs[`${appId}-${workspaceId}-seen-moved`] ||= onChildMoved(seenQuery, childCallback, onError);
  }

  subscribeOpenThreads({
    appId,
    workspaceId,
    subs,
    onThreadChange,
  }: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onThreadChange: Sync.OpenThreadEventHandler;
  }): void {
    const onError = (e: Error) => {
      console.error(e);
    };

    const onChange = (child: DataSnapshot) => {
      const threadId = child.key;
      const info = child.val() as { meta: ThreadMeta } | null;

      if (threadId) {
        onThreadChange({ threadId, info });
      }
    };

    const onRemoved = (child: DataSnapshot) => {
      const threadId = child.key;

      if (threadId) {
        onThreadChange({ threadId, info: null, wasRemoved: true });
      }
    };

    const viewRef = ref`/views/openThreads/${appId}/${workspaceId}`;
    subs[`${viewRef.toString()}#added`] ||= onChildAdded(viewRef, onChange, onError);
    subs[`${viewRef.toString()}#changed`] ||= onChildChanged(viewRef, onChange, onError);
    subs[`${viewRef.toString()}#removed`] ||= onChildRemoved(viewRef, onRemoved, onError);
  }

  async getOpenThreads({ appId, workspaceId }: { appId: string; workspaceId: string }) {
    const snapshot = await get(ref`/views/openThreads/${appId}/${workspaceId}`);

    if (!snapshot.exists()) {
      return [];
    }

    const object = snapshot.val();
    if (typeof object !== 'object') {
      return [];
    }

    const openThreads: { threadId: string; info: ThreadInfo }[] = [];
    for (const threadId in object) {
      const info = object[threadId];
      openThreads.push({ threadId, info });
    }

    return openThreads;
  }

  subscribeThreadInfo(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onThreadInfo: (props: Sync.ThreadInfoChangeEvent) => void;
  }) {
    const threadInfoRef = ref`/threadInfo/${props.appId}/${props.workspaceId}/${props.threadId}`;

    props.subs[`${threadInfoRef.toString()}#onValue`] ||= onValue(threadInfoRef, (snapshot) => {
      const info = snapshot.val();
      props.onThreadInfo({ workspaceId: props.workspaceId, threadId: props.threadId, info });
    });
  }

  subscribeInbox(props: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onInboxChange: Sync.InboxChangeEventHandler;
  }) {
    const inboxRef = query(
      ref`/views/inbox/${props.appId}/${props.workspaceId}`,
      orderByChild('createdAt'),
      limitToLast(20)
    );

    function childCallback(snapshot: DataSnapshot) {
      const threadId = snapshot.key && FirebaseId.decode(snapshot.key);
      const event = snapshotToEvent(snapshot, snapshot.val()?.id);
      if (!threadId || !event) {
        return;
      }

      props.onInboxChange({ event, threadId });
    }

    props.subs[`${inboxRef.toString()}#added`] ||= onChildAdded(inboxRef, childCallback, (e) => {
      console.error(e);
    });

    props.subs[`${inboxRef.toString()}#moved`] ||= onChildMoved(inboxRef, childCallback, (e) => {
      console.error(e);
    });
  }

  subscribeThread(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => void;
    onThreadTypingChange: (event: Sync.TypingEvent) => void;
    onThreadSeenByUser: (event: Sync.ThreadSeenEvent) => void;
    onThreadInfo: (props: Sync.ThreadInfoChangeEvent) => void;
    onThreadProfile: (props: Sync.ThreadProfileEvent) => void;
    onThreadProfiles: (props: Sync.ThreadProfilesEvent) => void;
  }) {
    subscribeTimeline(props);
    subscribeThreadIsTyping(props);
    subscribeThreadSeenBy(props);
    this.subscribeThreadInfo(props);
  }

  async getUser(props: { appId: string; workspaceId: string; userId: string }) {
    const snapshot = await get(ref`/profiles/${props.appId}/${props.userId}`);
    return snapshotToUser(snapshot);
  }
}
