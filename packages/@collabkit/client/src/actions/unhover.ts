import type { Target, Store } from '@collabkit/core';

export function unhover(store: Store, props: { target: Target }) {
  store.hoveringId = null;
}
