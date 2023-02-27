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

import {
  Event,
  OptionalWorkspaceProps,
  Subscriptions,
  ThreadInfo,
  ThreadMeta,
  Sync,
  FirebasePin,
  Timeline,
  timelineUtils,
  Attachment,
} from '@collabkit/core';

import { FirebaseId } from '@collabkit/core';

import { subscribeThreadIsTyping } from './subscribeThreadIsTyping';
import { subscribeTimeline } from './subscribeTimeline';
import { ref } from './refs';
import { initializeApp } from 'firebase/app';
import {
  eventToFirebaseEvent,
  idArrayToObject,
  snapshotToEvent,
  snapshotToProfile,
  snapshotToUser,
} from './converters';

function diffKeys(a: object, b: object) {
  const aKeys = new Set(Object.keys(a));
  const bKeys = new Set(Object.keys(b));
  const removed = new Set([...aKeys].filter((key) => !bKeys.has(key)));
  const added = new Set([...bKeys].filter((key) => !aKeys.has(key)));
  return { removed, added };
}

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

const DEBUG = false;

type FirebaseUpdates = {
  [path: string]: string | number | boolean | null | FirebaseUpdates | FirebaseUpdates[] | object;
};

const UpdateBuilder = {
  addAttachment({
    appId,
    workspaceId,
    attachment,
    attachmentId,
    eventId,
    userId,
    threadId,
  }: {
    appId: string;
    eventId: string;
    threadId: string;
    userId: string;
    workspaceId: string;
    attachment: Attachment;
    attachmentId: string;
  }) {
    const updates: FirebaseUpdates = {};
    // convert attachments to pin representation
    switch (attachment.type) {
      // for 'edit' or 'delete' operations we want delete
      // the original attachment, it can always be restored
      // from the previous event, should the 'delete' or 'edit'
      // be undone (should we add undo functionality).
      case 'pin': {
        const pinId = attachmentId;
        const { objectId, x, y, state } = attachment;
        const jsonState = JSON.stringify(state);
        const firebasePin: FirebasePin | null = {
          x,
          y,
          eventId,
          threadId,
          createdById: userId,
          state: jsonState,
        };
        updates[ref.path`/views/openPins/${appId}/${workspaceId}/${objectId}/${pinId}`] =
          firebasePin;
      }
    }
    return updates;
  },
  removeAttachment({
    appId,
    workspaceId,
    attachment,
    attachmentId,
  }: {
    appId: string;
    eventId: string;
    threadId: string;
    userId: string;
    workspaceId: string;
    attachment: Attachment;
    attachmentId: string;
  }) {
    const updates: FirebaseUpdates = {};
    // convert attachments to pin representation
    switch (attachment.type) {
      // for 'edit' or 'delete' operations we want delete
      // the original attachment, it can always be restored
      // from the previous event, should the 'delete' or 'edit'
      // be undone (should we add undo functionality).
      case 'pin': {
        const pinId = attachmentId;
        const { objectId } = attachment;
        updates[ref.path`/views/openPins/${appId}/${workspaceId}/${objectId}/${pinId}`] = null;
      }
    }
    return updates;
  },
  updateEventAttachments({
    eventId,
    appId,
    workspaceId,
    threadId,
    userId,
    event,
  }: {
    eventId: string;
    appId: string;
    workspaceId: string;
    threadId: string;
    event: Event;
    userId: string;
  }) {
    let updates: FirebaseUpdates = {};
    if (event.attachments) {
      for (const attachmentId in event.attachments) {
        const attachment = event.attachments[attachmentId];
        updates = {
          ...updates,
          ...UpdateBuilder.addAttachment({
            eventId,
            appId,
            workspaceId,
            threadId,
            userId,
            attachmentId,
            attachment,
          }),
        };
      }
    }
    return updates;
  },
  editEventAttachments({
    appId,
    workspaceId,
    event,
    parentEvent,
    userId,
    threadId,
    eventId,
    parentEventId,
  }: {
    appId: string;
    workspaceId: string;
    userId: string;
    threadId: string;
    event: Event;
    parentEvent: Event;
    eventId: string;
    parentEventId: string;
  }) {
    let updates: FirebaseUpdates = {};
    const { added, removed } = diffKeys(parentEvent.attachments ?? {}, event.attachments ?? {});
    removed.forEach((attachmentId) => {
      if (parentEvent.attachments) {
        const attachment = parentEvent.attachments[attachmentId];
        updates = {
          ...updates,
          ...UpdateBuilder.removeAttachment({
            appId,
            workspaceId,
            userId,
            threadId,
            eventId: parentEventId,
            attachmentId,
            attachment,
          }),
        };
      }
    });
    added.forEach((attachmentId) => {
      if (event.attachments) {
        const attachment = event.attachments[attachmentId];
        updates = {
          ...updates,
          ...UpdateBuilder.addAttachment({
            appId,
            workspaceId,
            userId,
            threadId,
            eventId,
            attachmentId,
            attachment,
          }),
        };
      }
    });
    return updates;
  },
  removeEventAttachments({
    appId,
    workspaceId,
    threadId,
    userId,
    event,
    eventId,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
    userId: string;
    event: Event;
    eventId: string;
  }) {
    let updates: FirebaseUpdates = {};
    if (event.attachments) {
      for (const attachmentId in event.attachments) {
        const attachment = event.attachments[attachmentId];
        updates = {
          ...updates,
          ...UpdateBuilder.removeAttachment({
            appId,
            workspaceId,
            attachmentId,
            threadId,
            userId,
            attachment,
            eventId,
          }),
        };
      }
    }
    return updates;
  },
  removeThreadAttachments({
    appId,
    workspaceId,
    timeline,
    threadId,
    userId,
  }: {
    appId: string;
    workspaceId: string;
    timeline: Timeline;
    threadId: string;
    userId: string;
  }) {
    return Object.values(timeline).reduce<FirebaseUpdates>((updates, timelineEvent) => {
      return {
        ...updates,
        ...UpdateBuilder.removeEventAttachments({
          event: timelineEvent,
          workspaceId,
          appId,
          eventId: timelineEvent.id,
          threadId,
          userId,
        }),
      };
    }, {});
  },
  stopTyping({
    appId,
    workspaceId,
    threadId,
    userId,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
    userId: string;
  }) {
    return {
      [ref.path`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`]: null,
    };
  },
  seen({
    appId,
    workspaceId,
    threadId,
    userId,
    seenUntilId,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
    userId: string;
    seenUntilId: string;
  }) {
    const data = { seenUntilId, seenAt: serverTimestamp() };
    return {
      [ref.path`/seen/${appId}/${userId}/${workspaceId}/${threadId}/`]: data,
      [ref.path`/views/seenBy/${appId}/${workspaceId}/${threadId}/${userId}`]: data,
    };
  },
  resolve({
    appId,
    workspaceId,
    threadId,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
  }) {
    return {
      [ref.path`/views/isOpen/${appId}/${workspaceId}/${threadId}`]: null,
      [ref.path`/views/isResolved/${appId}/${workspaceId}/${threadId}`]: true,
    };
  },
  reopen({
    appId,
    workspaceId,
    threadId,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
  }) {
    return {
      [ref.path`/views/isOpen/${appId}/${workspaceId}/${threadId}`]: true,
      [ref.path`/views/isResolved/${appId}/${workspaceId}/${threadId}`]: null,
    };
  },
};

export class FirebaseSync implements Sync.SyncAdapter {
  constructor(options = { test: false }) {
    initFirebase(options);
  }

  nextPinId(params: { appId: string; objectId: string; workspaceId: string }): string {
    DEBUG && console.log('[network] nextPinId', params);
    const { appId, objectId, workspaceId } = params;
    const pinRef = push(ref`/pins/${appId}/${workspaceId}/${objectId}`);
    if (!pinRef.key) throw new Error('pinId is undefined');
    return pinRef.key;
  }

  nextEventId(params: { appId: string; workspaceId: string; threadId: string }): string {
    DEBUG && console.log('[network] nextEventId', params);
    const { appId, threadId, workspaceId } = params;
    const eventRef = push(ref`/timeline/${appId}/${workspaceId}/${threadId}`);
    if (!eventRef.key) throw new Error('eventId is undefined');
    return eventRef.key;
  }

  nextThreadId(params: { appId: string; workspaceId: string }): string {
    DEBUG && console.log('[network] nextThreadId', params);
    const { appId, workspaceId } = params;
    const threadRef = push(ref`/timeline/${appId}/${workspaceId}`);
    if (!threadRef.key) throw new Error('threadId is undefined');
    return threadRef.key;
  }

  async subscribeOpenPins(params: {
    appId: string;
    workspaceId: string;
    subs: Subscriptions;
    onGet: (pins: { [objectId: string]: { [pinId: string]: { x: number; y: number } } }) => void;
    onObjectAdded: (objectId: string, pins: { [pinId: string]: { x: number; y: number } }) => void;
    onObjectChange: (objectId: string, pins: { [pinId: string]: { x: number; y: number } }) => void;
    onObjectRemove: (objectId: string) => void;
  }): Promise<void> {
    DEBUG && console.log('[network] subscribeOpenPins', params);
    const { subs, appId, workspaceId, onObjectChange, onObjectAdded, onObjectRemove, onGet } =
      params;
    const openPinsRef = ref`/views/openPins/${appId}/${workspaceId}`;

    await get(openPinsRef)
      .then((snapshot) => {
        const pins = snapshot.val();
        onGet(pins || {});
      })
      .catch((e) => {
        console.error('CollabKit pin fetch failed', e);
      });

    subs[openPinsRef.toString() + 'onChildAdded'] ||= onChildAdded(
      openPinsRef,
      (objectSnapshot) => {
        const objectId = objectSnapshot.key;
        const objectPins = objectSnapshot.val();
        if (objectId == null) return;
        DEBUG && console.log('[network] openPins child added', objectId, objectPins);
        onObjectAdded(FirebaseId.decode(objectId), objectPins);
      }
    );

    subs[openPinsRef.toString() + 'onChildChanged'] ||= onChildChanged(
      openPinsRef,
      (objectSnapshot) => {
        const objectId = objectSnapshot.key;
        const objectPins = objectSnapshot.val();
        if (objectId == null) return;
        DEBUG && console.log('[network] openPins child changed', objectId, objectPins);
        onObjectChange(FirebaseId.decode(objectId), objectPins);
      }
    );

    subs[openPinsRef.toString() + 'onChildRemoved'] ||= onChildRemoved(
      openPinsRef,
      (objectSnapshot) => {
        const objectId = objectSnapshot.key;
        if (objectId == null) return;
        DEBUG && console.log('[network] openPins child removed', objectId);
        onObjectRemove(FirebaseId.decode(objectId));
      }
    );
  }

  saveThreadInfo(data: {
    appId: string;
    workspaceId: string;
    threadId: string;
    isOpen: boolean;
    info?: ThreadInfo;
  }): Promise<void> {
    DEBUG && console.log('[network] saveThreadInfo', data);
    const { appId, workspaceId, threadId, info } = data;
    // bug here can't save undefined info to firebase
    const values = {
      [ref.path`/threadInfo/${appId}/${workspaceId}/${threadId}`]: info
        ? {
            ...info,
            defaultSubscribers: idArrayToObject(info.defaultSubscribers),
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
    DEBUG && console.log('[network] saveWorkspace', params);
    if (
      params.workspace &&
      params.workspace.name &&
      params.workspaceId !== 'default' &&
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
    DEBUG && console.log('[network] saveProfile', data);
    const { appId, userId, workspaceId, profile } = data;

    const updates: { [path: string]: any } = {
      [ref.path`/profiles/${appId}/${userId}`]: profile,
    };

    if (workspaceId !== 'default') {
      updates[ref.path`/views/workspaceProfiles/${appId}/${workspaceId}/${userId}`] = profile;
      updates[ref.path`/workspaces/${appId}/${workspaceId}/profiles/${userId}`] = true;
    }

    try {
      await update(ref`/`, updates);
    } catch (e) {
      console.error('CollabKit: failed to save profile', e);
    }
  }

  async getProfile(params: { appId: string; userId: string }) {
    DEBUG && console.log('[network] getProfile', params);
    const snapshot = await get(ref`/profiles/${params.appId}/${params.userId}`);
    return snapshotToProfile(snapshot);
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
    DEBUG && console.log('[network] markSeen', { appId, userId, workspaceId, threadId, eventId });
    await update(
      ref`/`,
      UpdateBuilder.seen({ appId, userId, workspaceId, threadId, seenUntilId: eventId })
    );
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
    DEBUG && console.log('[network] startTyping', { appId, userId, workspaceId, threadId });
    await set(ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`, true);
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
    DEBUG && console.log('[network] stopTyping', { appId, userId, workspaceId, threadId });
    await remove(ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
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
    DEBUG && console.log('[network] getIsTyping', { appId, userId, workspaceId, threadId });
    const snapshot = await get(ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
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
    event,
    parentEvent,
    newEventId,
    timeline,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    event: Event;
    parentEvent: Event | null;
    newEventId: string;
    timeline: Timeline;
  }): Promise<void> {
    DEBUG &&
      console.log('[network] sendMessage', {
        appId,
        userId,
        workspaceId,
        threadId,
        event,
      });
    const firebaseEvent = eventToFirebaseEvent(event);
    let updates: FirebaseUpdates = {};
    switch (event.type) {
      case 'message':
        updates = {
          ...updates,
          ...UpdateBuilder.updateEventAttachments({
            event,
            eventId: newEventId,
            threadId,
            userId,
            workspaceId,
            appId,
          }),
          ...UpdateBuilder.reopen({ appId, workspaceId, threadId }),
        };
        updates[ref.path`/views/inbox/${appId}/${workspaceId}/${threadId}`] = {
          ...firebaseEvent,
          id: newEventId,
          name: threadId,
        };
        break;
      case 'delete':
        if (!parentEvent) throw new Error('Cannot delete event without parent event');
        if (!event.parentId) throw new Error('Cannot delete event without parent id');
        const messages = timelineUtils.messageEvents(timeline);
        const lastMessage = messages[messages.length - 1];
        // one message left, which is about to be deleted
        const willBeEmpty = messages.length === 1 && event.parentId == lastMessage.id;
        const resolveEvent = {
          ...firebaseEvent,
          type: 'system',
          system: 'resolve',
          parentId: null,
        };

        updates = {
          ...updates,
          ...UpdateBuilder.removeEventAttachments({
            event: parentEvent,
            workspaceId,
            appId,
            userId,
            threadId,
            eventId: event.parentId,
          }),
          ...(willBeEmpty
            ? {
                ...UpdateBuilder.resolve({ appId, workspaceId, threadId }),
                ...UpdateBuilder.removeThreadAttachments({
                  appId,
                  workspaceId,
                  timeline,
                  userId,
                  threadId,
                }),
                [ref.path`/timeline/${appId}/${workspaceId}/${threadId}/${this.nextEventId({
                  appId,
                  workspaceId,
                  threadId,
                })}`]: resolveEvent,
              }
            : UpdateBuilder.reopen({ appId, workspaceId, threadId })),
        };
        break;
      case 'edit':
        if (!parentEvent) throw new Error('Cannot edit event without parent event');
        if (!event.parentId) throw new Error('Cannot edit event without parent id');
        updates = {
          ...updates,
          ...UpdateBuilder.editEventAttachments({
            event,
            eventId: newEventId,
            threadId,
            userId,
            workspaceId,
            appId,
            parentEvent,
            parentEventId: event.parentId,
          }),
          ...UpdateBuilder.reopen({ appId, workspaceId, threadId }),
        };
        break;
      case 'adminMessage':
        updates = {
          ...updates,
          ...UpdateBuilder.reopen({ appId, workspaceId, threadId }),
        };
        break;
      case 'reaction':
        updates = {
          ...updates,
          ...UpdateBuilder.reopen({ appId, workspaceId, threadId }),
        };
        break;
      case 'system':
        switch (event.system) {
          case 'resolve':
            updates = {
              ...updates,
              // remove all attachment views for the event
              ...UpdateBuilder.removeThreadAttachments({
                appId,
                workspaceId,
                timeline,
                userId,
                threadId,
              }),
              ...UpdateBuilder.resolve({ appId, workspaceId, threadId }),
            };
            break;
          case 'reopen':
            console.warn('[CollabKit] reopen not implemented');
            const deletedIds = timelineUtils.deletedIds(timeline);
            updates = {
              ...updates,
              ...Object.values(timeline).reduce<FirebaseUpdates>((updates, timelineEvent) => {
                if (deletedIds.has(timelineEvent.id)) return {};
                return {
                  ...updates,
                  ...UpdateBuilder.updateEventAttachments({
                    event: timelineEvent,
                    workspaceId,
                    appId,
                    userId: timelineEvent.createdById,
                    threadId,
                    eventId: timelineEvent.id,
                  }),
                };
              }, {}),
              ...UpdateBuilder.reopen({ appId, workspaceId, threadId }),
            };
            break;
        }
        break;
    }

    updates[ref.path`/timeline/${appId}/${workspaceId}/${threadId}/${newEventId}`] = firebaseEvent;
    updates[ref.path`/views/threadProfiles/${appId}/${workspaceId}/${threadId}/${userId}`] = true;
    updates = {
      ...updates,
      ...UpdateBuilder.stopTyping({ appId, workspaceId, threadId, userId }),
      ...UpdateBuilder.seen({
        appId,
        workspaceId,
        threadId,
        userId,
        seenUntilId: newEventId,
      }),
    };

    try {
      DEBUG && console.log('updates', updates);
      await update(ref`/`, updates);
    } catch (e: any) {
      const error = new Error('[CollabKit] failed to write msg: ' + e.message);
      error.stack += e.stack;
      throw error;
    }
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
    DEBUG && console.log('[network] subscribeSeen', { appId, userId, workspaceId });
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

    // todo optimise this with a single get and proxy set
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
    DEBUG && console.log('[network] subscribeOpenThreads', { appId, workspaceId });
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
    DEBUG &&
      console.log('[network] subscribeThreadInfo', {
        appId: props.appId,
        workspaceId: props.workspaceId,
        threadId: props.threadId,
      });
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
    DEBUG &&
      console.log('[network] subscribeInbox', {
        appId: props.appId,
        workspaceId: props.workspaceId,
      });

    const inboxQuery = query(
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

    props.subs[`${inboxQuery.toString()}#added`] ||= onChildAdded(
      inboxQuery,
      childCallback,
      (e) => {
        console.error(e);
      }
    );

    props.subs[`${inboxQuery.toString()}#moved`] ||= onChildMoved(
      inboxQuery,
      childCallback,
      (e) => {
        console.error(e);
      }
    );
  }

  subscribeThread(props: {
    appId: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => void;
    onThreadTypingChange: (event: Sync.TypingEvent) => void;
    onThreadInfo: (props: Sync.ThreadInfoChangeEvent) => void;
    onThreadProfile: (props: Sync.ThreadProfileEvent) => void;
    onThreadProfiles: (props: Sync.ThreadProfilesEvent) => void;
    onThreadResolveChange: (props: Sync.ThreadResolveChangeEvent) => void;
  }) {
    DEBUG && console.log('[network] subscribeThread', { threadId: props.threadId });
    subscribeTimeline(props);
    subscribeThreadIsTyping(props);
    this.subscribeThreadInfo(props);
  }

  async getUser(props: { appId: string; workspaceId: string; userId: string }) {
    DEBUG &&
      console.log('[network] getUser', {
        appId: props.appId,
        workspaceId: props.workspaceId,
        userId: props.userId,
      });
    const snapshot = await get(ref`/profiles/${props.appId}/${props.userId}`);
    return snapshotToUser(snapshot);
  }
}
