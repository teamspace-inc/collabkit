import type { ComposerTarget, Store } from '@collabkit/core';
import { getConfig } from './index';

export async function stopTyping(store: Store, props: { target: ComposerTarget }) {
  const { userId, appId } = getConfig(store);
  const { workspaceId, threadId, eventId } = props.target;
  if (!userId) {
    return;
  }

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot stop typing in read-only mode');
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
