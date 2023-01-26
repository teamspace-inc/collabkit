import { Store } from '@collabkit/core';

export function deselectAll(store: Store) {
  store.selectedId = null;
}
