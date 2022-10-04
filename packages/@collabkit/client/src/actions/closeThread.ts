import type { Store } from '@collabkit/core';

export function closeThread(store: Store) {
  store.viewingId = null;
}
