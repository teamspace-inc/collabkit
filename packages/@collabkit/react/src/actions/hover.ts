import { Target, Store } from '../constants';

export function hover(store: Store, props: { target: Target }) {
  store.hoveringId = props.target;
}
