import { expect, test, describe, beforeAll } from 'vitest';
import { nanoid } from 'nanoid';
import { setupApp, setupFirebase, setupWorkspaceProfile } from '../../../test-utils/src';
import { createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';

import { attachPin } from '../../src/actions/attachPin';
import { movePin } from '../../src/actions/movePin';
import { initComposer } from '../../src/actions/initComposer';
import { writeMessageToFirebase } from '../../src/actions/writeMessageToFirebase';

setupFirebase();

describe('pin', () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  const threadId = nanoid();
  const store = createStore();
  let pinId;
  let composer;
  beforeAll(async () => {
    await setupApp({ apiKey, appId });
    await setupWorkspaceProfile({ appId, workspaceId, userId });
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
  });

  test('attachPin', async () => {
    store.composerId = { type: 'composer', eventId: 'default', threadId, workspaceId };
    initComposer(store as Store, { threadId, workspaceId, eventId: 'default' });
    composer = store.workspaces[workspaceId].composers[threadId].default;
    composer.editor = null;
    pinId = attachPin(store as Store, { x: 0, y: 0, objectId: 'test' });

    const x = 0;
    const y = 0;

    expect(composer.pendingPin).toStrictEqual({
      objectId: 'test',
      threadId,
      id: pinId,
      workspaceId,
      eventId: 'default',
      x,
      y,
      isPending: true,
    });
  });

  test('movePin', async () => {
    await movePin(store as Store, { x: 10, y: 20, threadId, eventId: 'default', type: 'pending' });

    expect(composer.pendingPin).toStrictEqual({
      id: pinId,
      workspaceId,
      objectId: 'test',
      threadId,
      eventId: 'default',
      x: 10,
      y: 20,
      isPending: true,
    });
  });

  // requires refactoring sendMessage etc.
  // will bring this back in a separate PR
  // test('sendMessage to save pin', async () => {
  //   if (!store.sync) {
  //     throw new Error('store.sync is null');
  //   }

  //   const event = await writeMessageToFirebase(store as Store, {
  //     workspaceId,
  //     threadId,
  //     preview: 'test',
  //     type: 'message',
  //     body: 'test',
  //   });

  //   if (!event) {
  //     throw new Error('event is null');
  //   }

  //   expect(composer.pendingPin).toBeNull();

  //   expect(store.workspaces[workspaceId].openPins.test[pinId]).toStrictEqual({
  //     x: 10,
  //     y: 20,
  //     objectId: 'test',
  //     workspaceId,
  //     id: pinId,
  //     threadId,
  //     eventId: event.id,
  //   });
  // });
});
