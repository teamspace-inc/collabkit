import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import {
  createTokenAndSignIn,
  setupApp,
  setupFirebase,
  setupWorkspaceProfile,
} from '../../../test-utils/src';

import { createCollabKitStore, createWorkspace } from '../../src/store';
import type { Store } from '@collabkit/core';
import { saveThreadInfo } from '../../src/actions/saveThreadInfo';
import { initComposer } from '../../src/actions/initComposer';

setupFirebase();

test('saveThreadInfo', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  await setupApp({ apiKey, appId, mode: 'UNSECURED' });
  await createTokenAndSignIn({ apiKey, appId });
  await setupWorkspaceProfile({ appId, workspaceId, userId });
  const store = createCollabKitStore({
    apiKey,
    appId,
    mentionableUsers: [],
    user: {
      id: userId,
    },
    workspace: {
      id: workspaceId,
    },
    _test: true,
  });
  store.userId = userId;
  store.workspaceId = workspaceId;
  store.workspaces[workspaceId] = createWorkspace();

  const threadId = nanoid();
  initComposer(store, { workspaceId, threadId, eventId: 'default' });

  await saveThreadInfo(store as Store, {
    workspaceId,
    threadId,
    info: {
      url: 'https://www.google.com',
      meta: {
        viewId: '123',
      },
    },
  });

  expect(store.workspaces[workspaceId].threadInfo[threadId]).toStrictEqual({
    url: 'https://www.google.com',
    meta: {
      viewId: '123',
    },
  });

  let threadInfo = await store.sync.getThreadInfo({
    appId,
    workspaceId,
    threadId,
  });

  expect(threadInfo).toBeDefined();
  expect(threadInfo?.meta?.viewId).toStrictEqual('123');

  await saveThreadInfo(store as Store, {
    workspaceId,
    threadId,
    info: {
      url: 'https://www.google.com',
      meta: null,
    },
  });

  threadInfo = await store.sync.getThreadInfo({
    appId,
    workspaceId,
    threadId,
  });

  expect(threadInfo).toBeDefined();
  expect(threadInfo?.meta).toBeUndefined();
});
