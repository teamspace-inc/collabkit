import { Store, Target } from '../constants';

export function viewThread(store: Store, props: { target: Target }) {
  if (props.target.type === 'pin') {
    store.viewingId = props.target;
  }
}
