import type { Store } from '@collabkit/core';

export function blur(store: Store) {
  store.focusedId = null;
}
