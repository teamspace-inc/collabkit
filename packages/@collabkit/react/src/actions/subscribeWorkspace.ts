import { actions } from '.';
import { Store } from '../constants';

export async function subscribeWorkspace(store: Store) {
  if (store.isReadOnly) {
    console.warn("CollabKit: won't subscribe to workspace in read-only mode");
    return;
  }
  actions.subscribeSeen(store);
  actions.subscribePins(store);
}
