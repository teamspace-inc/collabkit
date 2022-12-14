import { get } from 'firebase/database';
import { nanoid } from 'nanoid';
import { expect, beforeAll, test, describe } from 'vitest';
import { ref } from '../../../src/sync/firebase/refs';
import { setupFirebase } from '../../setupFirebase';

setupFirebase();

import { Subscriptions, Sync, ThreadInfo } from '@collabkit/core';
import { createStore, createWorkspace, createComposer } from '../../../src/store';
import { FirebaseSync } from '../../../src/sync/firebase/FirebaseSync';
import { setupApp, setupWorkspaceProfile } from '../../helpers';

describe('FirebaseSync', async () => {
  let userId;
  let workspaceId;
  let store;
  let apiKey;
  let appId;
  let sync;

  beforeAll(async () => {
    appId = nanoid();
    apiKey = nanoid();
    await setupApp({ appId, apiKey });
    userId = nanoid();
    workspaceId = nanoid();
    await setupWorkspaceProfile({ appId, workspaceId, userId });
    sync = new FirebaseSync({ test: true });
    store = createStore();
    store.userId = userId;
    store.workspaceId = workspaceId;
    store.workspaces[workspaceId] = createWorkspace();
    store.workspaces[workspaceId].composers[nanoid()] = createComposer();
  });

  test('initFirebase', () => {
    expect(sync).toBeDefined();
  });

  test('start+stop typing', async () => {
    const threadId = nanoid();

    await sync.startTyping({
      appId,
      userId,
      workspaceId,
      threadId,
    });

    let snapshot = await get(ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
    expect(snapshot.exists()).toBe(true);
    expect(snapshot.val()).toBe(true);

    await sync.stopTyping({
      appId,
      userId,
      workspaceId,
      threadId,
    });

    snapshot = await get(ref`/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
    expect(snapshot.exists()).toBe(false);
    expect(snapshot.val()).toBe(null);
  });

  test('saveProfile + getProfile', async () => {
    let newUserId = nanoid();

    const profile: Sync.ServerProfile = {
      name: 'Test User',
      email: 'test@acme.com',
    };

    await sync.saveProfile({ appId, userId: newUserId, workspaceId, profile });

    const savedProfile = await sync.getProfile({ appId, userId: newUserId });
    expect(savedProfile).toStrictEqual({ ...profile, id: newUserId, color: expect.any(String) });
  });

  test('sendMessage', async () => {
    const subs: Subscriptions = {};

    const threadId = nanoid();

    const event = new Promise((resolve) => {
      sync.subscribeThread({
        appId,
        workspaceId,
        threadId,
        subs,
        onTimelineEventAdded: (event) => {
          resolve(event);
        },
        onThreadTypingChange: (event) => {},
        onThreadSeenByUser: (event) => {},
        onThreadInfo: (event) => {},
      });
    });

    const { id } = await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      preview: 'Test Message',
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
      },
    });

    const savedEvent = await event;

    Object.values(subs).map((sub) => sub());

    expect(savedEvent).toStrictEqual({
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: expect.any(Number),
        createdById: userId,
        mentions: [],
        id,
      },
      eventId: id,
      threadId,
      workspaceId,
    });
  });

  test('markResolved', async () => {
    const threadId = nanoid();

    await sync.saveThreadInfo({
      appId,
      workspaceId,
      threadId,
      isOpen: true,
      info: {
        url: 'https://www.acme.com',
        meta: {
          title: 'Test Title',
        },
      },
    });

    let openThreads = await sync.getOpenThreads({
      appId,
      workspaceId,
    });

    expect(openThreads.find((thread) => thread.threadId === threadId)).toBeDefined();

    await sync.markResolved({
      appId,
      workspaceId,
      threadId,
    });

    openThreads = await sync.getOpenThreads({
      appId,
      workspaceId,
    });

    expect(openThreads.find((thread) => thread.threadId === threadId)).toBeUndefined();
  });

  test('saveEvent', async () => {
    const subs: Subscriptions = {};

    const threadId = nanoid();

    const event = new Promise((resolve) => {
      sync.subscribeThread({
        appId,
        workspaceId,
        threadId,
        subs,
        onTimelineEventAdded: (event) => {
          resolve(event);
        },
        onThreadTypingChange: (event) => {},
        onThreadSeenByUser: (event) => {},
        onThreadInfo: (event) => {},
      });
    });

    const { id } = await sync.saveEvent({
      appId,
      workspaceId,
      threadId,
      event: {
        type: 'system',
        body: '',
        system: 'reopen',
        createdAt: Date.now(),
        createdById: userId,
      },
    });

    const savedEvent = await event;

    Object.values(subs).map((sub) => sub());

    expect(savedEvent).toStrictEqual({
      event: {
        type: 'system',
        body: '',
        system: 'reopen',
        createdAt: expect.any(Number),
        createdById: userId,
        mentions: [],
        id,
      },
      eventId: id,
      threadId,
      workspaceId,
    });
  });

  test('markSeen', async () => {
    const subs: Subscriptions = {};

    const threadId = nanoid();

    const { id } = await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      preview: 'Test Message',
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
      },
    });

    const seen = new Promise((resolve, reject) =>
      sync.subscribeSeen({
        appId,
        workspaceId,
        userId,
        subs,
        onSeenChange: (event) => {
          resolve(event);
        },
      })
    );

    await sync.markSeen({
      appId,
      workspaceId,
      userId,
      threadId,
      eventId: id,
    });

    expect(await seen).toStrictEqual({
      threadId,
      seenUntilId: id,
    });
  });

  test('subscribeInbox', async () => {
    const subs: Subscriptions = {};

    const inbox = new Promise((resolve) => {
      sync.subscribeInbox({
        appId,
        workspaceId,
        subs,
        onInboxChange: resolve,
      });
    });

    const threadId = nanoid();

    const { id } = await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      preview: 'Test Message',
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
      },
    });

    const updatedInbox = await inbox;

    Object.values(subs).map((sub) => sub());

    expect(updatedInbox).toStrictEqual({
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: expect.any(Number),
        createdById: userId,
        mentions: [],
        id,
        name: threadId,
      },
      threadId,
    });
  });

  async function testThreadInfo(threadId: string, value?: ThreadInfo, expected: any = value) {
    const subs: Subscriptions = {};

    const threadInfo = new Promise((resolve) => {
      sync.subscribeThreadInfo({
        appId,
        workspaceId,
        threadId,
        subs,
        onThreadInfo: resolve,
      });
    });

    await sync.saveThreadInfo({ appId, workspaceId, threadId, isOpen: true, info: value });

    const updatedThreadInfo = await threadInfo;

    Object.values(subs).map((sub) => sub());

    expect(updatedThreadInfo).toStrictEqual({
      info: expected,
      threadId,
      workspaceId,
    });
  }

  test('saveThreadInfo + subscribeThreadInfo { url: string }', async () => {
    await testThreadInfo(nanoid(), { url: 'https://google.com' });
  });

  test('saveThreadInfo + subscribeThreadInfo { name: string, url: string }', async () => {
    const threadId = nanoid();
    await testThreadInfo(threadId, { name: 'Google Thread', url: 'https://google.com' });
    // delete name
    await testThreadInfo(
      threadId,
      { name: null, url: 'https://google.com' },
      { url: 'https://google.com' }
    );
  });

  test('saveThreadInfo + subscribeThreadInfo { name: string, url: string, meta: {} }', async () => {
    await testThreadInfo(nanoid(), {
      name: 'Google Thread',
      url: 'https://google.com',
      meta: { x: 200, y: 200 },
    });
  });

  test('saveThreadInfo + subscribeThreadInfo { name: string, url: string, meta: {} } + delete', async () => {
    const threadId = nanoid();
    await testThreadInfo(threadId, {
      name: 'Google Thread',
      url: 'https://google.com',
      meta: { x: 200, y: 200 },
    });
    await testThreadInfo(threadId, {
      name: 'Google Thread',
      url: 'https://google.com',
    });
  });
});