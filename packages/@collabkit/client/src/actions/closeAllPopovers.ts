import type { Store } from '@collabkit/core';

export function closeAllPopovers(store: Store) {
  store.viewingId = null;
  store.previewingId = null;
}
