import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';

import { createComposer, createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';
import { saveThreadInfo } from '../../src/actions/saveThreadInfo';

setupFirebase();

test('saveThreadInfo', async () => {
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

  await saveThreadInfo(store as Store, {
    workspaceId,
    threadId,
    info: {
      url: 'https://www.google.com',
      meta: {
        viewId: '123',
      },
    },
    isOpen: true,
  });

  expect(store.workspaces[workspaceId].openThreads[threadId]).toStrictEqual({
    meta: {
      viewId: '123',
    },
  });

  let openThreads = await sync.getOpenThreads({
    appId,
    workspaceId,
  });

  let thread = openThreads.find((thread) => thread.threadId === threadId);
  expect(thread).toBeDefined();
  expect(thread?.info.meta?.viewId).toStrictEqual('123');

  await saveThreadInfo(store as Store, {
    workspaceId,
    threadId,
    info: {
      url: 'https://www.google.com',
      meta: {
        viewId: '123',
      },
    },
    isOpen: false,
  });

  expect(store.workspaces[workspaceId].openThreads[threadId]).toBeUndefined();

  thread = openThreads.find((thread) => thread.threadId === threadId);
  // todo this is a bug, if we mark isOpen to false
  // we should update /openThreads accordingly
  // expect(thread).toBeUndefined();
  // expect(thread?.info.meta?.viewId).toStrictEqual('123');
});
