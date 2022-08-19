import {
  DataSnapshot,
  get,
  limitToLast,
  onChildAdded,
  onChildChanged,
  onChildMoved,
  orderByChild,
  push,
  query,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
} from 'firebase/database';
import type { Color } from '@collabkit/colors';
import { DB } from './setup';
import type { Event, Pin, Subscriptions } from '@collabkit/core';
import { subscribeThreadIsTyping } from './subscribeThreadIsTyping';
import { subscribeThreadSeenBy } from './subscribeThreadSeenBy';
import { subscribeTimeline } from './subscribeTimeline';
import { timelineRef, userTypingRef } from './refs';
import type { Sync, UserProps } from '@collabkit/core';

export class FirebaseSync implements Sync.SyncAdapter {
  saveThreadInfo(data: {
    appId: string;
    workspaceId: string;
    threadId: string;
    info?: {
      name?: string;
      url?: string;
    };
  }): Promise<void> {
    return set(
      ref(DB, `/threadInfo/${data.appId}/${data.workspaceId}/${data.threadId}`),
      data.info
    );
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
    profile: Partial<UserProps> & { color: Color };
  }): Promise<void> {
    const { appId, userId, workspaceId, profile } = data;
    try {
      await set(ref(DB, `/profiles/${appId}/${userId}`), profile);
    } catch (e) {
      console.error('CollabKit: failed to set profile', e);
    }

    try {
      await set(ref(DB, `/workspaces/${appId}/${workspaceId}/profiles/${userId}`), true);
    } catch (e) {
      console.error('CollabKit: failed to join workspace', e);
    }
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
    const eventRef = await push(timelineRef(appId, workspaceId, threadId), event);
    if (!eventRef.key) {
      throw new Error('CollabKit: failed to save event');
    }
    return { id: eventRef.key };
  }

  async markResolved({
    appId,
    workspaceId,
    threadId,
  }: {
    appId: string;
    workspaceId: string;
    threadId: string;
  }) {
    await set(ref(DB, `pins/${appId}/${workspaceId}/${threadId}/state`), 'resolved');
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
    await update(ref(DB), {
      [`/seen/${appId}/${userId}/${workspaceId}/${threadId}/`]: data,
      [`/views/seenBy/${appId}/${workspaceId}/${threadId}/${userId}`]: data,
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

  async sendMessage({
    appId,
    userId,
    workspaceId,
    threadId,
    preview,
    pin,
    event,
  }: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
    preview: string;
    pin?: Pin;
    event: Event;
  }): Promise<{ id: string }> {
    // generate an id for the message
    const eventRef = await push(timelineRef(appId, workspaceId, threadId));

    if (!eventRef.key) {
      throw new Error('failed to gen push ref to timeline');
    }

    let data: { [key: string]: any } = {
      [`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]: event,
      [`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
        ...event,
        body: preview,
        name: threadId,
      },
    };

    if (pin) {
      data[`/pins/${appId}/${workspaceId}/${threadId}`] = {
        ...pin,
        state: 'open',
        createdAt: serverTimestamp(),
        createdById: userId,
      };
    }

    // write the data to firebase
    try {
      await update(ref(DB), data);
    } catch (e: any) {
      const error = new Error('failed to write msg: ' + e.message);
      error.stack += e.stack;
      throw error;
    }
    return { id: eventRef.key };
  }

  subscribeSeen(
    {
      appId,
      userId,
      workspaceId,
      subs,
    }: {
      appId: string;
      userId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onSeenChange: Sync.SeenEventHandler
  ): void {
    const seenQuery = query(
      ref(DB, `/seen/${appId}/${userId}/${workspaceId}`),
      orderByChild('seenUntilId'),
      limitToLast(100)
    );

    function childCallback(snapshot: DataSnapshot) {
      const threadId = snapshot.key;
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

  subscribePins(
    {
      appId,
      workspaceId,
      subs,
    }: {
      appId: string;
      workspaceId: string;
      subs: Subscriptions;
    },
    onPinChange: Sync.PinEventHandler
  ): void {
    // console.log('subscribePins');
    const onError = (e: Error) => {
      console.error({ e });
    };

    const onChange = (child: DataSnapshot) => {
      // console.log('onPin');
      const pin = child.val() as Pin;
      const pinId = child.key;
      if (pinId) {
        onPinChange({ pinId, pin });
      }
    };

    const pinsRef = ref(DB, `/pins/${appId}/${workspaceId}`);

    subs[`${pinsRef.toString()}#added`] = onChildAdded(pinsRef, onChange, onError);
    subs[`${pinsRef.toString()}#changed`] = onChildChanged(pinsRef, onChange, onError);
  }

  subscribeThread(props: {
    appId: string;
    userId?: string;
    workspaceId: string;
    threadId: string;
    subs: Subscriptions;
    onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => void;
    onThreadTypingChange: (event: Sync.TypingEvent) => void;
    onThreadSeenByUser: (event: Sync.ThreadSeenEvent) => void;
  }) {
    subscribeTimeline(props);
    subscribeThreadIsTyping(props);
    subscribeThreadSeenBy(props);
  }

  getUser(props: { appId: string; workspaceId: string; userId: string }) {
    return get(ref(DB, `/profiles/${props.appId}/${props.userId}`));
  }
}
