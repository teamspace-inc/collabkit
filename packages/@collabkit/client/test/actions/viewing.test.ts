import { expect, test, describe } from 'vitest';
import { createStore } from '../../src/store';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { PinTarget, Store, ThreadTarget } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { viewContent } from '../../src/actions/viewContent';
import { closeContent } from '../../src/actions/closeContent';
import { closeAll } from '../../src/actions/closeAll';

describe('viewing and hiding a thread', async () => {
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
    viewContent(store as Store, { target });
    expect(store.viewingId).toBe(target);
  });

  test('view another', () => {
    closeContent(store as Store, { target: anotherTarget });
    expect(store.viewingId).toBe(target);
  });

  test('close', () => {
    closeContent(store as Store, { target });
    expect(store.viewingId).toBe(null);
  });

  test('close all', () => {
    viewContent(store as Store, { target });
    expect(store.viewingId).toBe(target);
    closeAll(store as Store);
    expect(store.viewingId).toBe(null);
  });
});

describe('viewing and hiding a comment pin', async () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.viewingId).toBe(null);

  const target: PinTarget = {
    type: 'pin',
    threadId: nanoid(),
    workspaceId: nanoid(),
    id: nanoid(),
    objectId: nanoid(),
    eventId: nanoid(),
  };

  const anotherTarget: PinTarget = {
    type: 'pin',
    threadId: nanoid(),
    workspaceId: nanoid(),
    id: nanoid(),
    objectId: nanoid(),
    eventId: nanoid(),
  };

  test('view', () => {
    viewContent(store as Store, { target });
    expect(store.viewingId).toBe(target);
  });

  test('view another', () => {
    closeContent(store as Store, { target: anotherTarget });
    expect(store.viewingId).toBe(target);
  });

  test('close', () => {
    closeContent(store as Store, { target });
    expect(store.viewingId).toBe(null);
  });

  test('close all', () => {
    viewContent(store as Store, { target });
    expect(store.viewingId).toBe(target);
    closeAll(store as Store);
    expect(store.viewingId).toBe(null);
  });
});
