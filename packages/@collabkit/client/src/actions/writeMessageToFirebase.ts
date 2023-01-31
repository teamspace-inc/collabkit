import type { Event, Pin, Store, WithID } from '@collabkit/core';
import { actions } from './';

async function savePin(
  store: Store,
  props: { pin: WithID<Pin>; appId: string; workspaceId: string }
) {
  const { pin, appId, workspaceId } = props;
  if (!pin) {
    console.warn('CollabKit: no pending pin to save');
    return;
  }
  try {
    // console.log('CollabKit: saving pin', pin);
    await store.sync.savePin({
      appId,
      workspaceId,
      pin,
      pinId: pin.id,
    });
    store.workspaces[workspaceId].openPins[pin.objectId] ||= {};
    store.workspaces[workspaceId].openPins[pin.objectId][pin.id] = {
      id: pin.id,
      eventId: pin.eventId,
      objectId: pin.objectId,
      workspaceId: pin.workspaceId,
      threadId: pin.threadId,
      x: pin.x,
      y: pin.y,
    };
  } catch (e) {
    console.error('CollabKit: failed to save pin', e);
  }
}

export async function writeMessageToFirebase(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    body: string;
    preview: string;
    parentId?: string;
    type: 'message' | 'reaction' | 'edit';
    mentions?: string[];
    pin?: Pin | null;
  }
) {
  const { type, workspaceId, threadId, body, preview, parentId, mentions, pin } = props;

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot send message in read-only mode');
    return;
  }

  const userId = store.userId;
  const appId = store.config.appId;

  if (!appId) {
    console.warn('CollabKit: cannot send a message, no appId');
    return;
  }

  if (!userId) {
    console.warn('CollabKit: cannot send a message, no userId');
    return;
  }

  // close emoji picker on send
  store.reactingId = null;

  const event: Event = {
    type,
    body,
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
    mentions,
  };

  if (parentId) {
    event.parentId = parentId;
  }

  try {
    const { id } = await store.sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      preview,
      event,
    });

    store.workspaces[workspaceId].seen[threadId] = id;
    store.workspaces[workspaceId].timeline[threadId] ||= {};
    store.workspaces[workspaceId].timeline[threadId][id] = {
      ...event,
      hasProfile: true,
      createdAt: +Date.now(),
      id,
    };

    // stop typing indicator as we sent the message successfully
    try {
      const promises = [];
      // we only show the typing indicator for new messages
      // not for edits or reactions
      if (type === 'message') {
        promises.push(
          actions.stopTyping(store, {
            target: { workspaceId, threadId, eventId: 'default' },
          })
        );
      }

      if (pin) {
        promises.push(
          savePin(store, { pin: { ...pin, eventId: parentId ?? id }, appId, workspaceId })
        );
      }

      promises.push(
        actions.seen(store, {
          target: {
            workspaceId,
            threadId,
            eventId: id,
            type: 'comment',
            treeId: '',
          },
        })
      );

      await Promise.all(promises);
    } catch (e) {
      console.error('CollabKit: error stopping typing indicator', e);
    }

    const eventWithId: WithID<Event> = {
      id,
      ...event,
    };

    return eventWithId;
  } catch (e) {
    console.error(e);
    // todo: handle failure here
  }
}
