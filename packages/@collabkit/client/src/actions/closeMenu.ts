import type { Store } from '@collabkit/core';

export function closeMenu(store: Store) {
  store.menuId = null;
}
