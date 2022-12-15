import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { openMenu } from '../../src/actions/openMenu';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { MenuTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';

test('openMenu', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  const menuTarget: MenuTarget = {
    type: 'menu',
    nodeId: nanoid(),
    parentId: null,
  };
  openMenu(store as Store, { target: menuTarget });
  expect(store.menuId).toBe(menuTarget);
});
