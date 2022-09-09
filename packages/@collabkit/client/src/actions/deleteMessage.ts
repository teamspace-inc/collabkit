import type { Store } from '@collabkit/core';
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

  const workspace = store.workspaces[workspaceId];
  workspace.timeline[threadId][eventId].isDeleted = true;
  await store.sync.deleteEvent({ appId, workspaceId, threadId, eventId });
}
