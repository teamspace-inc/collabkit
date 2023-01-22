import { Store } from '@collabkit/core';

export function deletePendingPin(store: Store) {
  store.pendingPin = null;
  store.uiState = 'idle';
}
