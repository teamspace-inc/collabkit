import type { Store } from '@collabkit/core';

export async function showSidebar(store: Store) {
  store.isSidebarOpen = true;
}
