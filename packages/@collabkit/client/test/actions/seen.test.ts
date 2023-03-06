import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import {
  createTokenAndSignIn,
  setupApp,
  setupFirebase,
  setupWorkspaceProfile,
} from '../../../test-utils/src';

import { createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { seen } from '../../src/actions/seen';
import { initComposer } from '../../src/actions/initComposer';
import { getThreadSeenBy } from '../../src/sync/firebase/getThreadSeenBy';

setupFirebase();

test('seen', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  await setupApp({ apiKey, appId, mode: 'UNSECURED' });
  await createTokenAndSignIn({ apiKey, appId });
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
  store.workspaces[workspaceId].timeline[threadId] = {};

  const firstEventId = sync.nextEventId({ appId, workspaceId, threadId });
  await sync.sendMessage({
    appId,
    workspaceId,
    threadId,
    userId,
    event: {
      type: 'message',
      body: 'Hello world',
      createdAt: sync.serverTimestamp(),
      createdById: userId,
    },
    timeline: {},
    parentEvent: null,
    newEventId: firstEventId,
  });

  const secondEventId = sync.nextEventId({ appId, workspaceId, threadId });
  await sync.sendMessage({
    appId,
    workspaceId,
    threadId,
    userId,
    event: {
      type: 'message',
      body: 'Hello world',
      createdAt: sync.serverTimestamp(),
      createdById: userId,
    },
    timeline: {},
    parentEvent: null,
    newEventId: secondEventId,
  });

  const target: CommentTarget = {
    type: 'comment',
    threadId,
    eventId: secondEventId,
    workspaceId,
    treeId: 'any',
  };

  let seenBy = await getThreadSeenBy({
    appId,
    workspaceId,
    threadId,
  });

  expect(seenBy).toStrictEqual({
    [userId]: {
      seenAt: expect.any(Number),
      seenUntilId: secondEventId,
    },
  });

  store.userId = 'other-user';

  await seen(store as Store, { target });

  seenBy = await getThreadSeenBy({
    appId,
    workspaceId,
    threadId,
  });

  expect(seenBy).toStrictEqual({
    ['other-user']: {
      seenAt: expect.any(Number),
      seenUntilId: secondEventId,
    },
    [userId]: {
      seenAt: expect.any(Number),
      seenUntilId: secondEventId,
    },
  });

  // // ensure marking earlier events as seen is a no-op
  await seen(store as Store, { target: { ...target, eventId: firstEventId } });

  seenBy = await getThreadSeenBy({
    appId,
    workspaceId,
    threadId,
  });

  expect(seenBy).toStrictEqual({
    ['other-user']: {
      seenAt: expect.any(Number),
      seenUntilId: secondEventId,
    },
    [userId]: {
      seenAt: expect.any(Number),
      seenUntilId: secondEventId,
    },
  });
});
