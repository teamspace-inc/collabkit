import type { Store, Target } from '@collabkit/core';

export function viewThread(store: Store, props: { target: Target }) {
  if (props.target.type === 'pin') {
    store.viewingId = props.target;
  }
}
