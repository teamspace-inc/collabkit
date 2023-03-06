import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import {
  setupApp,
  setupFirebase,
  setupProfile,
  setupWorkspaceProfile,
  createTokenAndSignIn,
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
import { createEvent } from '../../src/actions/createEvent';

setupFirebase();

test('deleteMessage', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  await setupApp({ apiKey, appId, mode: 'UNSECURED' });
  await createTokenAndSignIn({ apiKey, appId });
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

  const messageEvent = await createEvent(store as Store, {
    threadId,
    event: {
      type: 'message',
      body: 'Hello world',
      createdAt: sync.serverTimestamp(),
      createdById: userId,
    },
    parentEvent: null,
  });

  expect(messageEvent.id).toBeDefined();
  if (!messageEvent.id) throw new Error('ID is undefined');

  const event = await deleteMessage(store as Store, {
    workspaceId,
    threadId,
    eventId: messageEvent.id,
  });

  expect(event?.id).toBeDefined();
  if (!event?.id) throw new Error('ID is undefined');

  const timeline = await getTimeline({
    appId,
    workspaceId,
    threadId,
  });

  expect(timeline).toBeDefined();
  if (!timeline) throw new Error('Timeline is undefined');

  expect(timeline[event?.id]).toStrictEqual({
    id: expect.any(String),
    type: 'delete',
    body: '',
    parentId: messageEvent.id,
    createdAt: expect.any(Number),
    createdById: userId,
    mentions: [],
  });
});
