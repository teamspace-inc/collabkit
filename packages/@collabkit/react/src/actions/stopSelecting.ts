import { Store } from '../constants';

export function stopSelecting(store: Store) {
  store.uiState = 'idle';
}
