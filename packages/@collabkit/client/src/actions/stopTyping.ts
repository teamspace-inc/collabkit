import type { Store } from '@collabkit/core';

export async function stopTyping(
  store: Store,
  props: { target: { workspaceId: string; threadId: string; eventId: string } }
) {
  const { userId, appId } = store;

  if (!userId) {
    throw new Error('CollabKit: cannot stop typing without a user');
  }

  if (!appId) {
    throw new Error('CollabKit: cannot stop typing without an app');
  }

  const { workspaceId, threadId, eventId } = props.target;
  if (!userId) {
    return;
  }

  const timeoutID = store.workspaces[workspaceId].composers[threadId][eventId].isTypingTimeoutID;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  await store.sync.stopTyping({
    appId,
    workspaceId,
    threadId,
    userId,
  });
}
