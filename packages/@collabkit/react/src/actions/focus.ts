import { Store, Target } from '../constants';

export function focus(store: Store, target: Target) {
  store.focusedId = target;
}
