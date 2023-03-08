import { expect, test, describe, beforeAll } from 'vitest';
import { nanoid } from 'nanoid';
import {
  createTokenAndSignIn,
  setupApp,
  setupFirebase,
  setupWorkspaceProfile,
} from '../../../test-utils/src';
import { createCollabKitStore, createWorkspace } from '../../src/store';
import type { Store } from '@collabkit/core';

import { attachComposerPin } from '../../src/actions/attachComposerPin';
import { initComposer } from '../../src/actions/initComposer';

setupFirebase();

describe('pin', () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  const threadId = nanoid();
  let store: Store;
  let pinId;
  let composer;

  beforeAll(async () => {
    await setupApp({ apiKey, appId, mode: 'UNSECURED' });
    await createTokenAndSignIn({ apiKey, appId });
    await setupWorkspaceProfile({ appId, workspaceId, userId });
    store = createCollabKitStore({
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
  });

  test('attachPin', async () => {
    store.composerId = {
      type: 'composer',
      eventId: 'default',
      threadId,
      workspaceId,
      isNewThread: false,
    };
    initComposer(store as Store, { threadId, workspaceId, eventId: 'default' });
    composer = store.workspaces[workspaceId].composers[threadId].default;
    composer.editor = null;
    pinId = attachComposerPin(store as Store, { x: 0, y: 0, objectId: 'test' });

    const x = 0;
    const y = 0;

    const keys = Object.keys(composer.attachments);
    expect(keys.length).toBe(1);
    expect(keys[0]).toBe(pinId);
    expect(composer.attachments[pinId]).toStrictEqual({
      objectId: 'test',
      x,
      y,
      pending: true,
      type: 'pin',
      meta: null,
    });
  });
});
