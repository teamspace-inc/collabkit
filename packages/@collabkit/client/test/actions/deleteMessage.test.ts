import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import {
  setupApp,
  setupFirebase,
  setupProfile,
  setupWorkspaceProfile,
} from '../../../test-utils/src';
import { createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';
import { deleteMessage } from '../../src/actions/deleteMessage';
import { getTimeline } from '../../src/sync/firebase/getTimeline';
import { initComposer } from '../../src/actions/initComposer';
import { initThread } from '../../src/actions/initThread';
import { proxy } from 'valtio/vanilla';

setupFirebase();

test('deleteMessage', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  await setupApp({ apiKey, appId });
  await setupProfile({ appId, userId });

  await setupWorkspaceProfile({ appId, workspaceId, userId });
  const store = proxy(createStore());
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
  initThread(store as Store, { workspaceId, threadId });
  initComposer(store, { workspaceId, threadId, eventId: 'default' });
  store.workspaces[workspaceId].timeline[threadId] = {};

  const eventId = sync.nextEventId({ appId, workspaceId, threadId });
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
    eventId,
  });

  const id = await deleteMessage(store as Store, { workspaceId, threadId, eventId });

  expect(id).toBeDefined();
  if (!id) throw new Error('ID is undefined');

  const timeline = await getTimeline({
    appId,
    workspaceId,
    threadId,
  });

  expect(timeline).toBeDefined();
  if (!timeline) throw new Error('Timeline is undefined');

  expect(timeline[id]).toStrictEqual({
    id: expect.any(String),
    type: 'delete',
    body: '',
    parentId: eventId,
    createdAt: expect.any(Number),
    createdById: userId,
    mentions: [],
  });
});
