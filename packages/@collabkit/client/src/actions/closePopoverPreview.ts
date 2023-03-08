import type { Store, Target } from '@collabkit/core';
import { isEqual } from '@collabkit/core';

export function closePopoverPreview(store: Store, props: { target: Target }) {
  if (isEqual(store.previewingId, props.target)) {
    store.previewingId = null;
  }
}
