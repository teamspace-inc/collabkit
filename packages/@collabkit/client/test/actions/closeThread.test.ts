import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store, ThreadTarget } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { viewThread } from '../../src/actions/viewThread';
import { closeThread } from '../../src/actions/closeThread';

test('closeThread', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.viewingId).toBe(null);
  const target: ThreadTarget = {
    type: 'thread',
    threadId: nanoid(),
    workspaceId: nanoid(),
  };
  const anotherTarget: ThreadTarget = {
    type: 'thread',
    threadId: nanoid(),
    workspaceId: target.workspaceId,
  };
  viewThread(store as Store, { target });
  expect(store.viewingId).toBe(target);
  closeThread(store as Store, { target: anotherTarget });
  expect(store.viewingId).toBe(target);
  closeThread(store as Store, { target });
  expect(store.viewingId).toBe(null);
});
