import { Store, Target } from '@collabkit/core';

export function select(store: Store, props: { target: Target }) {
  const { target } = props;
  store.selectedId = target;
  if (target.type === 'comment') {
    store.previewingId = target;
  }
}
