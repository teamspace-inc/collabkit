import { expect, test, describe } from 'vitest';
import { createStore } from '../../src/store';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store, ThreadTarget } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { viewThread } from '../../src/actions/viewThread';
import { closeThread } from '../../src/actions/closeThread';
import { closeAll } from '../../src/actions/closeAll';

describe('viewThread', async () => {
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

  test('view', () => {
    viewThread(store as Store, { target });
    expect(store.viewingId).toBe(target);
  });

  test('view another', () => {
    closeThread(store as Store, { target: anotherTarget });
    expect(store.viewingId).toBe(target);
  });

  test('close', () => {
    closeThread(store as Store, { target });
    expect(store.viewingId).toBe(null);
  });

  test('close all', () => {
    viewThread(store as Store, { target });
    expect(store.viewingId).toBe(target);
    closeAll(store as Store);
    expect(store.viewingId).toBe(null);
  });
});
