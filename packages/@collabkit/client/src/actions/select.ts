import { Store, Target } from '@collabkit/core';

export function select(store: Store, props: { target: Target }) {
  store.selectedId = props.target;
}
