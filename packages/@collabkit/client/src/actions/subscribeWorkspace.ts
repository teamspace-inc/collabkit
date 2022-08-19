import { actions } from '.';
import { Store } from '@collabkit/core';

export async function subscribeWorkspace(store: Store) {
  if (store.isReadOnly) {
    console.warn("CollabKit: won't subscribe to workspace in read-only mode");
    return;
  }
  actions.subscribeSeen(store);
  actions.subscribePins(store);
}
