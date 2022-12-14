import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupWorkspaceProfile } from '../helpers';
import { setupFirebase } from '../setupFirebase';
import { createComposer, createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';
import { getTimeline } from '../../src/sync/firebase/getTimeline';
import { resolveThread } from '../../src/actions/resolveThread';

setupFirebase();

test('reopenThread', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
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

  const threadId = nanoid();

  store.workspaces[workspaceId].composers[threadId] = createComposer();
  store.workspaces[workspaceId].timeline[threadId] = {};

  await sync.sendMessage({
    appId,
    workspaceId,
    threadId,
    userId,
    preview: 'Hello world',
    event: {
      type: 'message',
      body: 'Hello world',
      createdAt: +new Date(),
      createdById: userId,
    },
  });

  await resolveThread(store as Store, { workspaceId, threadId });

  const events = await getTimeline({
    appId,
    workspaceId,
    threadId,
  });

  expect(events?.[1]).toStrictEqual({
    id: expect.any(String),
    type: 'system',
    system: 'resolve',
    body: '',
    createdAt: expect.any(Number),
    createdById: userId,
    mentions: [],
  });
});
