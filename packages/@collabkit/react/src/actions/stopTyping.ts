import { ComposerTarget, Store } from '../constants';
import { getConfig } from './index';

export async function stopTyping(store: Store, props: { target: ComposerTarget }) {
  const { userId, appId } = getConfig(store);
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot stop typing in read-only mode');
    return;
  }

  const timeoutID =
    store.workspaces[props.target.workspaceId].composers[props.target.threadId].isTypingTimeoutID;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  await store.sync.stopTyping({
    appId,
    workspaceId: props.target.workspaceId,
    threadId: props.target.threadId,
    userId,
  });
}
