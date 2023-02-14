import type { Event, Store } from '@collabkit/core';
import { getConfig } from './getConfig';

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
  const newEventId = store.sync.nextEventId({ appId, workspaceId, threadId });
  const event: Event = {
    type: 'delete',
    body: '',
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
    parentId: eventId,
  };
  const parentEvent = workspace.timeline[threadId][eventId];
  await store.sync.sendMessage({
    appId,
    workspaceId,
    threadId,
    userId,
    event,
    parentEvent,
    newEventId,
  });
  const timeline = workspace.timeline[threadId];
  timeline[newEventId] = {
    ...event,
    createdAt: +Date.now(),
    id: newEventId,
  };
  const isEmpty = workspace.computed[threadId].messageEvents.length === 0;
  const isResolved = workspace.computed[threadId].isResolved;
  const isOpen = !isEmpty && !isResolved;
  if (!isOpen) {
    delete store.workspaces[workspaceId].openThreads[threadId];
    await store.sync.markResolved({ appId, workspaceId, threadId });
  }
  return newEventId;
}
