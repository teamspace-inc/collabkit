import { isEqual, Store, Target } from '@collabkit/core';

export function closePreview(store: Store, props: { target: Target }) {
  if (isEqual(store.previewingId, props.target)) {
    store.previewingId = null;
  }
}
