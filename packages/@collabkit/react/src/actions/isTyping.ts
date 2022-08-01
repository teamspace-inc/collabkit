import { ComposerTarget, Store } from '../constants';

export async function isTyping(store: Store, props: { target: ComposerTarget }) {
  const { config } = store;

  if (!config.setup || !config.identify?.userId) {
    return;
  }

  const timeoutID =
    store.workspaces[props.target.workspaceId].composers[props.target.threadId].isTypingTimeoutID;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  const params = {
    appId: config.setup.appId,
    workspaceId: props.target.workspaceId,
    threadId: props.target.threadId,
    userId: config.identify.userId,
  };
  await store.sync.startTyping(params);

  store.workspaces[props.target.workspaceId].composers[props.target.threadId].isTypingTimeoutID =
    setTimeout(() => {
      store.sync.stopTyping(params);
    }, 1000);
}
