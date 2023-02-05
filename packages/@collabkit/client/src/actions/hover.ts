import { Store, Target } from '@collabkit/core';

export function hover(store: Store, props: { target: Target }) {
  const { target } = props;
  store.hoveringId = target;
}
