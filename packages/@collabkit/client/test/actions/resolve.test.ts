import { expect, test, describe, beforeAll } from 'vitest';
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
import { Store, timelineUtils } from '@collabkit/core';
import { getTimeline } from '../../src/sync/firebase/getTimeline';
import { resolveThread } from '../../src/actions/resolveThread';
import { initComposer } from '../../src/actions/initComposer';
import { reopenThread } from '../../src/actions/reopenThread';

setupFirebase();

describe('resolve + reopen', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const userId = nanoid();
  const workspaceId = nanoid();
  const store = createStore();
  const sync = new FirebaseSync({ test: true });
  const threadId = nanoid();

  beforeAll(async () => {
    await setupApp({ apiKey, appId });
    await createTokenAndSignIn({ apiKey, appId });
    await setupWorkspaceProfile({ appId, workspaceId, userId });
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

    store.appId = appId;
    store.userId = userId;
    store.workspaceId = workspaceId;
    store.workspaces[workspaceId] = createWorkspace();
    store.workspaces[workspaceId].timeline[threadId] = {};
    initComposer(store, { workspaceId, threadId, eventId: 'default' });

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
    });
  });

  test('resolve', async () => {
    let timeline = await getTimeline({
      appId,
      workspaceId,
      threadId,
    });

    expect(timeline).toBeDefined();

    if (!timeline) {
      throw new Error('timeline is undefined');
    }

    expect(timelineUtils.computeIsResolved(timeline)).toBe(false);

    const event = await resolveThread(store as Store, { workspaceId, threadId });

    expect(event?.id).toBeDefined();

    if (!event?.id) {
      throw new Error('id is undefined');
    }

    timeline = await getTimeline({
      appId,
      workspaceId,
      threadId,
    });

    expect(timeline?.[event.id]).toStrictEqual({
      id: expect.any(String),
      type: 'system',
      system: 'resolve',
      body: '',
      createdById: userId,
      createdAt: expect.any(Number),
      mentions: [],
    });

    timeline = await getTimeline({
      appId,
      workspaceId,
      threadId,
    });

    expect(timeline).toBeDefined();

    if (!timeline) {
      throw new Error('timeline is undefined');
    }

    expect(timelineUtils.computeIsResolved(timeline)).toBe(true);
  });

  test('reopen', async () => {
    const createdEvent = await reopenThread(store as Store, { workspaceId, threadId });
    expect(createdEvent?.id).toBeDefined();
    if (!createdEvent?.id) {
      throw new Error('id is undefined');
    }

    let timeline = await getTimeline({
      appId,
      workspaceId,
      threadId,
    });

    expect(timeline).toBeDefined();
    if (!timeline) {
      throw new Error('timeline is undefined');
    }

    expect(timeline?.[createdEvent.id]).toStrictEqual({
      id: expect.any(String),
      type: 'system',
      system: 'reopen',
      body: '',
      createdById: userId,
      createdAt: expect.any(Number),
      mentions: [],
    });

    expect(timelineUtils.computeIsResolved(timeline)).toBe(false);
  });
});
