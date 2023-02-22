import { actions } from '.';
import type { Store } from '@collabkit/core';

export async function subscribeWorkspace(store: Store) {
  if (store.isReadOnly) {
    console.warn("CollabKit: won't subscribe to workspace in read-only mode");
    return;
  }
  actions.subscribeOpenThreads(store);
}
