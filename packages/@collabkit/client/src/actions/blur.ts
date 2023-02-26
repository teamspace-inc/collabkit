import type { Store, Target } from '@collabkit/core';
import equals from 'fast-deep-equal';

export function blur(store: Store, props: { target: Target }) {
  if (equals(store.focusedId, props.target)) {
    store.focusedId = null;
  }
}
