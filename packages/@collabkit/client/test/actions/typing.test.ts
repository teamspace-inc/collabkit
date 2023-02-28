import { expect, test, describe, beforeAll } from 'vitest';
import { nanoid } from 'nanoid';
import { isTyping } from '../../src/actions/isTyping';
import {
  createTokenAndSignIn,
  setupApp,
  setupFirebase,
  setupWorkspaceProfile,
} from '../../../test-utils/src';
import { createStore, createWorkspace } from '../../src/store';
import { init } from '../../src/actions/init';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { Store } from '@collabkit/core';
import { subscribeThreadIsTyping } from '../../src/sync/firebase/subscribeThreadIsTyping';
import { initComposer } from '../../src/actions/initComposer';
import { stopTyping } from '../../src/actions/stopTyping';

setupFirebase();

describe('typing', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  const store = createStore();
  const sync = new FirebaseSync({ test: true });
  const threadId = nanoid();
  let typing;

  beforeAll(async () => {
    await setupApp({ apiKey, appId });
    await setupWorkspaceProfile({ appId, workspaceId, userId });
    await createTokenAndSignIn({ apiKey, appId });
    store.userId = userId;
    store.workspaceId = workspaceId;
    store.workspaces[workspaceId] = createWorkspace();
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
    initComposer(store, { workspaceId, threadId, eventId: 'default' });
  });

  test('typing', async () => {
    await sync.sendMessage({
      appId,
      workspaceId,
      threadId,
      userId,
      event: {
        type: 'message',
        body: 'Hello world',
        createdAt: +new Date(),
        createdById: userId,
      },
      parentEvent: null,
      newEventId: sync.nextEventId({ appId, workspaceId, threadId }),
      timeline: {},
    });

    typing = new Promise((resolve) =>
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
        eventId: 'default',
        isNewThread: false,
      },
    });

    expect(await typing).toStrictEqual({
      threadId,
      userId,
      workspaceId,
      isTyping: true,
    });
  });

  test('stopTyping', async () => {
    const target = {
      workspaceId,
      threadId,
      eventId: 'default',
    };

    await stopTyping(store as Store, { target });

    typing = await sync.getIsTyping({
      appId,
      workspaceId,
      threadId,
      userId,
    });

    expect(typing).toBeNull();
  });
});
