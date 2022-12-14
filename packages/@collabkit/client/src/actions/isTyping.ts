import type { ComposerTarget, Store } from '@collabkit/core';

export async function isTyping(store: Store, props: { target: ComposerTarget }) {
  const { config } = store;

  if (!store.userId) {
    console.warn('CollabKit: cannot start typing, no userId');
    return;
  }

  const timeoutID =
    store.workspaces[props.target.workspaceId].composers[props.target.threadId].isTypingTimeoutID;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  const params = {
    appId: config.appId,
    workspaceId: props.target.workspaceId,
    threadId: props.target.threadId,
    userId: store.userId,
  };

  await store.sync.startTyping(params);

  store.workspaces[props.target.workspaceId].composers[props.target.threadId].isTypingTimeoutID =
    setTimeout(() => {
      store.sync.stopTyping(params);
    }, 1000);
}
