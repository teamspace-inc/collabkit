import { Store } from '@collabkit/core';

export async function showInbox(store: Store) {
  store.isInboxOpen = true;
}
