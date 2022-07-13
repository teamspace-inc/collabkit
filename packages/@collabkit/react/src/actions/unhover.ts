import { Target, Store } from '../constants';

export function unhover(store: Store, props: { target: Target }) {
  store.hoveringId = null;
}
