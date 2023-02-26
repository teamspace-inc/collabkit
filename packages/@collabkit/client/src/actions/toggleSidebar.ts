import type { Store } from '@collabkit/core';

export async function toggleSidebar(store: Store) {
  store.isSidebarOpen = !store.isSidebarOpen;
}
