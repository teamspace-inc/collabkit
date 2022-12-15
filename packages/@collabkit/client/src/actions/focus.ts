import type { Store, Target } from '@collabkit/core';

export function focus(store: Store, props: { target: Target }) {
  store.focusedId = props.target;
}
