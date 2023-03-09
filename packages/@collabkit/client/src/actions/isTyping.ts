import type { ComposerTarget, Store } from '@collabkit/core';
import debounce from 'lodash.debounce';

interface DebouncedFunc<T extends (...args: any[]) => any> {
  /**
   * Call the original function, but applying the debounce rules.
   *
   * If the debounced function can be run immediately, this calls it and returns its return
   * value.
   *
   * Otherwise, it returns the return value of the last invocation, or undefined if the debounced
   * function was not invoked yet.
   */
  (...args: Parameters<T>): ReturnType<T> | undefined;

  /**
   * Throw away any pending invocation of the debounced function.
   */
  cancel(): void;

  /**
   * If there is a pending invocation of the debounced function, invoke it immediately and return
   * its return value.
   *
   * Otherwise, return the value from the last invocation, or undefined if the debounced function
   * was never invoked.
   */
  flush(): ReturnType<T> | undefined;
}
interface DebouncedFuncLeading<T extends (...args: any[]) => any> extends DebouncedFunc<T> {
  (...args: Parameters<T>): ReturnType<T>;
  flush(): ReturnType<T>;
}

async function _isTyping(store: Store, props: { target: ComposerTarget }) {
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
    () => store.sync.stopTyping(params),
    1000
  );
}

export const isTyping = debounce(_isTyping, 1000, {
  leading: true,
  maxWait: 1000,
}) as DebouncedFuncLeading<typeof _isTyping>;
