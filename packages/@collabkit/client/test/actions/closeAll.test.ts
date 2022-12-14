import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store, ThreadTarget } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { viewThread } from '../../src/actions/viewThread';
import { closeAll } from '../../src/actions/closeAll';

test('closeAll', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.viewingId).toBe(null);
  const target: ThreadTarget = {
    type: 'thread',
    threadId: nanoid(),
    workspaceId: nanoid(),
  };
  viewThread(store as Store, { target });
  expect(store.viewingId).toBe(target);
  closeAll(store as Store);
  expect(store.viewingId).toBe(null);
});