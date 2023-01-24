import { expect, test, describe } from 'vitest';
import { createStore } from '../../src/store';
import { openMenu } from '../../src/actions/openMenu';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { MenuTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { closeMenu } from '../../src/actions/closeMenu';

describe('menu', async () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  const menuTarget: MenuTarget = {
    type: 'menu',
    nodeId: nanoid(),
    parentId: null,
  };

  test('open', () => {
    openMenu(store as Store, { target: menuTarget });
    expect(store.menuId).toBe(menuTarget);
  });

  test('close', () => {
    closeMenu(store as Store);
    expect(store.menuId).toBe(null);
  });
});
