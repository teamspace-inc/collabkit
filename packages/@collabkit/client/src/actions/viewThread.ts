import type { Store, Target } from '@collabkit/core';

export function viewThread(store: Store, props: { target: Target }) {
  store.viewingId = props.target;
}
