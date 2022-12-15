import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { showSidebar } from '../../src/actions/showSidebar';
import { hideSidebar } from '../../src/actions/hideSidebar';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';

test('hideSidebar', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.isSidebarOpen).toBe(false);
  showSidebar(store as Store);
  expect(store.isSidebarOpen).toBe(true);
  hideSidebar(store as Store);
  expect(store.isSidebarOpen).toBe(false);
});
