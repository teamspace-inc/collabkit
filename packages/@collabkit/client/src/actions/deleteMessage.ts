import type { Store } from '@collabkit/core';
import { createEvent } from './createEvent';

export async function deleteMessage(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const { userId } = store;
  if (!userId) {
    console.warn('[CollabKit]: cannot send a message, anonymous user');
    if (store.config.onAuthenticationRequired) {
      store.config.onAuthenticationRequired();
    }
    return;
  }
  const workspace = store.workspaces[workspaceId];
  const parentEvent = workspace.timeline[threadId][eventId];
  const event = await createEvent(store, {
    event: {
      type: 'delete',
      body: '',
      createdAt: store.sync.serverTimestamp(),
      createdById: userId,
      parentId: eventId,
    },
    threadId,
    parentEvent,
  });
  return event;
}
