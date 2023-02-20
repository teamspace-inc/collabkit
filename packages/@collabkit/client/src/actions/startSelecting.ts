import type { Store } from '@collabkit/core';

export function startSelecting(store: Store) {
  store.uiState = 'selecting';
}
