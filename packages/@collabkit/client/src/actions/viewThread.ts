import type { Store, ThreadTarget } from '@collabkit/core';

export function viewThread(store: Store, props: { target: ThreadTarget }) {
  console.log('viewThread', props.target);
  store.viewingId = props.target;
}
