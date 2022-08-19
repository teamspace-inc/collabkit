import type { Store, Target } from '@collabkit/core';

export function focus(store: Store, target: Target) {
  store.focusedId = target;
}
