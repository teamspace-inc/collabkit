import type { ComposerTarget, Store } from '@collabkit/core';

export async function isTyping(store: Store, props: { target: ComposerTarget }) {
  const { config } = store;
  const { workspaceId, threadId, eventId } = props.target;

  if (!store.userId) {
    console.warn('CollabKit: cannot start typing, no userId');
    return;
  }

  const timeoutID = store.workspaces[workspaceId].composers[threadId][eventId].isTypingTimeoutID;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  const params = {
    appId: config.appId,
    workspaceId,
    threadId,
    userId: store.userId,
  };

  await store.sync.startTyping(params);

  store.workspaces[workspaceId].composers[threadId][eventId].isTypingTimeoutID = setTimeout(
    async () => {
      await store.sync.stopTyping(params);
    },
    1000
  );
}
