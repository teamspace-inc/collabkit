import { Store } from '@collabkit/core';

export function startSelecting(store: Store) {
  // console.log('start selecting');
  store.uiState = 'selecting';
}
