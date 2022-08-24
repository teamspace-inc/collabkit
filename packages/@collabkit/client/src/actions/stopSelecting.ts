import type { Store } from '@collabkit/core';

export function stopSelecting(store: Store) {
  store.uiState = 'idle';
}
