import type { Store, ThreadTarget } from '@collabkit/core';

export function viewThread(store: Store, props: { target: ThreadTarget; isPreview: boolean }) {
  if (props.isPreview) {
    store.previewingId = props.target;
  } else {
    store.viewingId = props.target;
  }
}
