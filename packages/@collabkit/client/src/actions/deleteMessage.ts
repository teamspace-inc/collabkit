import type { Event, Store } from '@collabkit/core';
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
  store.workspaces[workspaceId].timeline[threadId] ||= {};
  store.workspaces[workspaceId].timeline[threadId][id] = {
    ...event,
    createdAt: +Date.now(),
    id,
  };
}
