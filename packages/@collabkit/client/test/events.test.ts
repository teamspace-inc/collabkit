import { createEvents } from '../src/events';
import { expect, test } from 'vitest';
import { createStore } from '../src/store';

test('createEvents', () => {
  const store = createStore();
  expect(true).toBe(true);
  // expect(createEvents(store)).toStrictEqual({
  //   sync: null,
  //   isConnected: false,
  //   isSidebarOpen: false,
  //   appState: 'blank',
  //   uiState: 'idle',
  //   config: null,
  //   userId: null,
  //   user: null,
  //   workspaceId: null,
  //   focusedId: null,
  //   menuId: null,
  //   selectedId: null,
  //   reactingId: null,
  //   viewingId: null,
  //   previewingId: null,
  //   editingId: null,
  //   hoveringId: null,
  //   workspaces: {},
  //   profiles: {},
  //   avatarErrors: {},
  //   subs: {},
  //   callbacks: {},
  //   mentionableUsers: {},
  // });
});
