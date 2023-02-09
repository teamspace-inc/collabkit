import { expect, test, beforeAll } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';

import { writeMessageToFirebase } from '../../src/actions/writeMessageToFirebase';
import { subscribeTimeline } from '../../src/sync/firebase/subscribeTimeline';
import { init } from '../../src/actions/init';
import { createStore, createWorkspace } from '../../src/store';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store, SyncAdapter } from '@collabkit/core';
import { initComposer } from '../../src/actions/initComposer';
import { proxy } from 'valtio/vanilla';
import { initThread } from '../../src/actions/initThread';

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
  const unconfiguredStore = proxy(createStore());

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
  initThread(store as Store, { workspaceId, threadId });
  initComposer(store, { workspaceId, threadId, eventId: 'default' });
});

test('writes a message to a threads timeline', async () => {
  const events = new Promise((resolve) => {
    subscribeTimeline({
      appId,
      workspaceId,
      threadId,
      subs: {},
      onTimelineGetComplete: resolve,
      onTimelineEventAdded: () => {},
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

  expect(await events).toStrictEqual([
    {
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
    },
  ]);
});
