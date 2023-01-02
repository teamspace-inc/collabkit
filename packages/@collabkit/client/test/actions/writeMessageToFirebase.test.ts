import { expect, test, beforeAll } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';

import { writeMessageToFirebase } from '../../src/actions/writeMessageToFirebase';
import { subscribeTimeline } from '../../src/sync/firebase/subscribeTimeline';
import { init } from '../../src/actions/init';
import { createComposer, createStore, createWorkspace } from '../../src/store';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store, SyncAdapter } from '@collabkit/core';

setupFirebase();

let userId: string;
let workspaceId: string;
let store: Store;
let apiKey: string;
let appId: string;
let sync: SyncAdapter;
const threadId = nanoid();

beforeAll(async () => {
  appId = nanoid();
  apiKey = nanoid();
  await setupApp({ appId, apiKey });
  userId = nanoid();
  workspaceId = nanoid();
  await setupWorkspaceProfile({ appId, workspaceId, userId });
  sync = new FirebaseSync({ test: true });
  const unconfiguredStore = createStore();

  await init(
    unconfiguredStore,
    {
      apiKey,
      appId,
      user: {
        id: userId,
      },
      workspace: {
        id: workspaceId,
      },
      mentionableUsers: [],
    },
    sync
  );

  store = unconfiguredStore as Store;
  store.userId = userId;
  store.workspaceId = workspaceId;
  store.workspaces[workspaceId] = createWorkspace();
  store.workspaces[workspaceId].composers[threadId] = createComposer();
});

test('writes a message to a threads timeline', async () => {
  const message = new Promise((resolve) => {
    subscribeTimeline({
      appId,
      workspaceId,
      threadId,
      subs: {},
      onTimelineEventAdded: resolve,
      onThreadProfile: () => {},
      onThreadProfiles(props) {},
    });
  });

  await writeMessageToFirebase(store, {
    workspaceId,
    threadId,
    body: 'Hello world',
    preview: 'Hello world',
    type: 'message',
  });

  expect(await message).toStrictEqual({
    event: {
      body: 'Hello world',
      createdAt: expect.any(Number),
      createdById: userId,
      id: expect.any(String),
      mentions: [],
      type: 'message',
    },
    eventId: expect.any(String),
    threadId,
    workspaceId,
  });
});
