import type { Store } from '@collabkit/core';

export async function closeThread(store: Store, { isPreview } = { isPreview: false }) {
  if (isPreview) {
    store.previewingId = null;
  } else {
    store.viewingId = null;
  }
}
