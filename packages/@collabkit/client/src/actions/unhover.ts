import type { Store } from '@collabkit/core';

export function unhover(store: Store) {
  store.hoveringId = null;
}
