import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';
import { createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';

import { addPin } from '../../src/actions/addPin';
import { movePin } from '../../src/actions/movePin';
import { savePin } from '../../src/actions/savePin';

setupFirebase();

test('pin', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  const threadId = nanoid();

  await setupApp({ apiKey, appId });
  await setupWorkspaceProfile({ appId, workspaceId, userId });
  const store = createStore();
  store.userId = userId;
  store.workspaceId = workspaceId;
  store.workspaces[workspaceId] = createWorkspace();
  const sync = new FirebaseSync({ test: true });

  await init(
    store,
    {
      apiKey,
      appId,
      mentionableUsers: [],
      user: {
        id: userId,
      },
      workspace: {
        id: workspaceId,
      },
    },
    sync
  );

  if (!store.sync) {
    throw new Error('store.sync is null');
  }

  const { id: eventId } = await store.sync.sendMessage({
    appId,
    userId,
    workspaceId,
    threadId,
    preview: 'test',
    event: {
      type: 'message',
      body: 'test',
      createdAt: store.sync.serverTimestamp(),
      createdById: userId,
    },
  });

  const objectId = 'test';
  const x = 0;
  const y = 0;

  addPin(store as Store, { workspaceId, objectId, pin: { x, y, threadId, eventId } });

  expect(store.workspaces[workspaceId].pendingPin).toStrictEqual({
    objectId,
    threadId,
    eventId,
    x,
    y,
  });

  await movePin(store as Store, { x: 10, y: 20 });

  expect(store.workspaces[workspaceId].pendingPin).toStrictEqual({
    objectId,
    threadId,
    eventId,
    x: 10,
    y: 20,
  });

  const pinId = await savePin(store as Store);

  if (!pinId) {
    throw new Error('pinId is null');
  }

  expect(store.workspaces[workspaceId].pendingPin).toBeNull();

  expect(store.workspaces[workspaceId].openPins.test[pinId]).toStrictEqual({
    x: 10,
    y: 20,
    threadId,
    eventId,
  });
});
