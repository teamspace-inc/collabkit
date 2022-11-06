import type { Store } from '@collabkit/core';

export function closeAll(store: Store) {
  store.viewingId = null;
}
