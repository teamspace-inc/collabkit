import type { Store } from '@collabkit/core';

export async function closeThread(store: Store) {
  store.viewingId = null;
}
