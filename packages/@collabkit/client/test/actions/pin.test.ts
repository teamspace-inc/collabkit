import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';
import { createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';

import { placePin } from '../../src/actions/placePin';
import { movePlacedPin } from '../../src/actions/movePlacedPin';
import { savePin } from '../../src/actions/savePin';
import { sendMessage } from '../../src/actions/sendMessage';
import { writeMessageToFirebase } from '../../src/actions/writeMessageToFirebase';

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

  await store.sync?.sendMessage({
    appId,
    userId,
    workspaceId,
    threadId,
    preview: 'test',
    event: {
      type: 'message',
      body: 'test',
      createdAt: store.sync?.serverTimestamp(),
      createdById: userId,
    },
  });

  const pinId = nanoid();

  placePin(store as Store, { pinId, workspaceId, objectId: 'test', x: 0, y: 0 });

  expect(store.workspaces[workspaceId].pendingPins.test).toStrictEqual({
    [pinId]: {
      x: 0,
      y: 0,
    },
  });

  movePlacedPin(store as Store, { workspaceId, objectId: 'test', pinId, x: 10, y: 10 });

  expect(store.workspaces[workspaceId].pendingPins.test[pinId]).toStrictEqual({
    x: 10,
    y: 10,
  });

  await savePin(store as Store, { workspaceId, objectId: 'test', pinId, threadId });

  // expect(store.workspaces[workspaceId].pendingPins.test).toStrictEqual({});

  expect(store.workspaces[workspaceId].pins.test).toStrictEqual({
    [pinId]: {
      x: 10,
      y: 10,
      threadId,
    },
  });

  expect(store.workspaces[workspaceId].openPins.test[pinId]).toStrictEqual({
    x: 10,
    y: 10,
    threadId,
  });
});
