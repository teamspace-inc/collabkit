import type { Store } from '@collabkit/core';

export function stopEditing(store: Store) {
  store.editingId = null;
}
