import type { Target, Store } from '@collabkit/core';

export function hover(store: Store, props: { target: Target }) {
  store.hoveringId = props.target;
}
