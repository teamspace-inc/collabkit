import { Store } from '../constants';

export function positionThread(store: Store, props: { point: { x: number; y: number } }) {
  store.point = props.point;
}
