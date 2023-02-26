import type { Store, Target } from '@collabkit/core';
import { deselectAll } from './deselectAll';

export function focus(store: Store, props: { target: Target }) {
  store.focusedId = props.target;

  // if it's a root composer we want to focus on just that
  if (props.target.type === 'composer' && props.target.isNewThread) {
    deselectAll(store);
  }
}
