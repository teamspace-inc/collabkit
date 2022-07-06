import { Store, Target } from '../constants';

export function blur(store: Store, target: Target) {
  store.focusedId = null;
}
