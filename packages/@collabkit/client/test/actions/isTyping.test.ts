import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { isTyping } from '../../src/actions/isTyping';
import { setupApp, setupWorkspaceProfile } from '../helpers';
import { setupFirebase } from '../setupFirebase';
import { createComposer, createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';
import { subscribeThreadIsTyping } from '../../src/sync/firebase/subscribeThreadIsTyping';

setupFirebase();

test('isTyping', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  await setupApp({ apiKey, appId });
  await setupWorkspaceProfile({ appId, workspaceId, userId });
  const store = createStore();
  store.userId = userId;
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

  const { id } = await sync.sendMessage({
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

  const typing = new Promise((resolve) =>
    subscribeThreadIsTyping({
      appId,
      workspaceId,
      threadId,
      userId,
      subs: {},
      onThreadTypingChange: resolve,
    })
  );

  await isTyping(store as Store, {
    target: {
      type: 'composer',
      workspaceId,
      threadId,
      eventId: id,
    },
  });

  expect(await typing).toStrictEqual({
    threadId,
    userId,
    workspaceId,
    isTyping: true,
  });
});
