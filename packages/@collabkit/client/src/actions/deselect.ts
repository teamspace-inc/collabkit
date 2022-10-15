import { Store } from '@collabkit/core';

export function deselect(store: Store) {
  store.selectedId = null;
}
