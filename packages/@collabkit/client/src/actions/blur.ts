import type { Store, Target } from '@collabkit/core';

export function blur(store: Store, target: Target) {
  store.focusedId = null;
}
