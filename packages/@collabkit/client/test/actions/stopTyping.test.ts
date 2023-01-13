import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';

import { createComposer, createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { ComposerTarget, Store } from '@collabkit/core';
import { subscribeThreadIsTyping } from '../../src/sync/firebase/subscribeThreadIsTyping';
import { stopTyping } from '../../src/actions/stopTyping';
import { isTyping } from '../../src/actions/isTyping';
import { initComposer } from '../../src/actions/initComposer';

setupFirebase();

test('stopTyping', async () => {
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

  initComposer(store, { workspaceId, threadId, eventId: 'default' });

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

  let typing = new Promise((resolve) =>
    subscribeThreadIsTyping({
      appId,
      workspaceId,
      threadId,
      userId,
      subs: {},
      onThreadTypingChange: resolve,
    })
  );

  const target: ComposerTarget = {
    type: 'composer',
    workspaceId,
    threadId,
    eventId: 'default',
  };

  await isTyping(store as Store, {
    target,
  });

  expect(await typing).toStrictEqual({
    threadId,
    userId,
    workspaceId,
    isTyping: true,
  });

  await stopTyping(store as Store, { target });

  typing = await sync.getIsTyping({
    appId,
    workspaceId,
    threadId,
    userId,
  });

  expect(typing).toBeNull();
});
