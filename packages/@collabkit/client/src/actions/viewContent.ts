import type { Store, Target } from '@collabkit/core';

export function viewContent(store: Store, props: { target: Target }) {
  store.viewingId = props.target;
}
