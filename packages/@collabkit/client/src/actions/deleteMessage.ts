import type { Event, Store } from '@collabkit/core';
import { timelineUtils } from '@collabkit/core';
import { messageEvents } from '@collabkit/core/src/timelineUtils';
import { getConfig } from '.';

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

  const timeline = store.workspaces[workspaceId].timeline[threadId];
  timeline[id] = {
    ...event,
    createdAt: +Date.now(),
    id,
  };
  const isEmpty = messageEvents(timeline).length === 0;
  const isResolved = timelineUtils.computeIsResolved(timeline);
  const isOpen = !isEmpty && !isResolved;
  if (!isOpen) {
    delete store.workspaces[workspaceId].openThreads[threadId];
    await store.sync.markResolved({ appId, workspaceId, threadId });
  }
}
