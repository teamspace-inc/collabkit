import { isEqual, Store, Target } from '@collabkit/core';

export function closeContent(store: Store, props: { target: Target }) {
  if (isEqual(store.viewingId, props.target)) {
    store.viewingId = null;
  }
}
