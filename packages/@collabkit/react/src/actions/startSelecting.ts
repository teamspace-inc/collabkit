import { Store } from '../constants';

export function startSelecting(store: Store) {
  store.uiState = 'selecting';
}
