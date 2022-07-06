import { Store } from '../constants';
import { uninspect } from '../components/Commentable';

export function stopSelecting(store: Store) {
  store.uiState = 'idle';
  uninspect();
}
