import { isEqual, Store, Target } from '@collabkit/core';

export function unhover(store: Store, props: { target: Target }) {
  if (isEqual(store.hoveringId, props.target)) {
    store.hoveringId = null;
  }
}
