import { Store } from '../constants';

export function startSelecting(store: Store) {
  // console.log('start selecting');
  store.uiState = 'selecting';
}
