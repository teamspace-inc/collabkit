import type { Store, Target } from '@collabkit/core';

export function viewThread(store: Store, props: { target: Target; isPreview: boolean }) {
  if (props.isPreview) {
    store.previewingId = props.target;
  } else {
    store.viewingId = props.target;
  }
}
