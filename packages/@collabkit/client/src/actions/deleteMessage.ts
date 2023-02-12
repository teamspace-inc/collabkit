import type { Event, Store } from '@collabkit/core';
import { getConfig } from 'getConfig';

export async function deleteMessage(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const { appId, userId } = getConfig(store);
  if (!userId) {
    console.warn('[CollabKit]: cannot send a message, anonymous user');
    if (store.config.onAuthenticationRequired) {
      store.config.onAuthenticationRequired();
    }
    return;
  }

  const workspace = store.workspaces[workspaceId];

  const event: Event = {
    type: 'delete',
    body: '',
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
    parentId: eventId,
  };

  const { id } = await store.sync.saveEvent({
    appId,
    workspaceId,
    threadId,
    event,
  });

  const timeline = workspace.timeline[threadId];
  timeline[id] = {
    ...event,
    createdAt: +Date.now(),
    id,
  };

  const pin = workspace.eventPins[eventId];

  if (pin) {
    try {
      await store.sync.deletePin({ appId, ...pin, pinId: pin.id });
      console.log('CollabKit: deleted pin', pin.id);
    } catch (e) {
      console.error('CollabKit: failed to delete pin', e);
    }
  }

  const isEmpty = workspace.computed[threadId].messageEvents.length === 0;
  const isResolved = workspace.computed[threadId].isResolved;
  const isOpen = !isEmpty && !isResolved;
  if (!isOpen) {
    delete store.workspaces[workspaceId].openThreads[threadId];
    await store.sync.markResolved({ appId, workspaceId, threadId });
  }

  return id;
}
