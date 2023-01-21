import { expect, test, describe } from 'vitest';
import { createStore } from '../../src/store';
import { showSidebar } from '../../src/actions/showSidebar';
import { hideSidebar } from '../../src/actions/hideSidebar';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';

describe('sidebar', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  test('hidden by default', () => {
    expect(store.isSidebarOpen).toBe(false);
  });
  test('show', () => {
    showSidebar(store as Store);
    expect(store.isSidebarOpen).toBe(true);
  });
  test('hide', () => {
    hideSidebar(store as Store);
    expect(store.isSidebarOpen).toBe(false);
  });
});
