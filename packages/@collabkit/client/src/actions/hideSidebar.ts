import type { Store } from '@collabkit/core';

export async function hideSidebar(store: Store) {
  store.isSidebarOpen = false;
}
