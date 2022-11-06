import type { Store, ThreadTarget } from '@collabkit/core';

export function previewThread(store: Store, props: { target: ThreadTarget }) {
  store.previewingId = props.target;
}
