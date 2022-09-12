import type { Store } from '@collabkit/core';

export async function hideInbox(store: Store) {
  store.isInboxOpen = false;
}
