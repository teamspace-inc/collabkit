import type { Store } from '@collabkit/core';

export function destroy(store: Store) {
  for (const unsubscribe of Object.values(store.subs)) {
    unsubscribe();
  }
  store.subs = {};
}
