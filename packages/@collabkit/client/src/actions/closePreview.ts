import type { Store } from '@collabkit/core';

export function closePreview(store: Store) {
  store.previewingId = null;
}
