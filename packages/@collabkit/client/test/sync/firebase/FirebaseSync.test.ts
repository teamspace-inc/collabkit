import { get } from 'firebase/database';
import { nanoid } from 'nanoid';
import { expect, beforeAll, test, describe } from 'vitest';
import { ref } from '../../../src/sync/firebase/refs';
import {
  setupApp,
  setupFirebase,
  setupProfile,
  setupWorkspaceProfile,
} from '../../../../test-utils/src';

import { Attachment, FirebaseId, Subscriptions, Sync, ThreadInfo } from '@collabkit/core';
import { createStore, createWorkspace, createComposer } from '../../../src/store';
import { FirebaseSync } from '../../../src/sync/firebase/FirebaseSync';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import admin from 'firebase-admin';
import { getApp } from 'firebase/app';

setupFirebase();

describe('FirebaseSync', async () => {
  let userId;
  let workspaceId;
  let store;
  let apiKey;
  let appId;
  let sync: FirebaseSync;

  beforeAll(async () => {
    appId = nanoid();
    apiKey = nanoid();
    await setupApp({ appId, apiKey, mode: 'UNSECURED' });
    userId = nanoid();
    workspaceId = nanoid();
    await setupWorkspaceProfile({ appId, workspaceId, userId });
    await setupProfile({ appId, userId });
    sync = new FirebaseSync({ test: true });
    store = createStore();
    const token = await admin
      .app()
      .auth()
      .createCustomToken(apiKey, {
        api: true,
        mode: 'UNSECURED',
        appId: FirebaseId.encode(appId),
        userId: FirebaseId.encode(userId),
        workspaceId: FirebaseId.encode(workspaceId),
      });
    await signInWithCustomToken(getAuth(getApp('CollabKit')), token);
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
        onThreadResolveChange: (event) => {},
        onTimelineEventAdded: (event) => {
          resolve(event);
        },
        onThreadTypingChange: (event) => {},
        onThreadInfo: (event) => {},
        onThreadProfile: (event) => {},
        onThreadProfiles(props) {},
      });
    });

    const id = sync.nextEventId({ appId, workspaceId, threadId });

    await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
        attachments: null,
        mentions: [],
      },
      timeline: {},
      parentEvent: null,
      newEventId: id,
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

  test('sendMessage with attachments', async () => {
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
        onThreadResolveChange: (event) => {},
        onThreadTypingChange: (event) => {},
        onThreadInfo: (event) => {},
        onThreadProfile: (event) => {},
        onThreadProfiles(props) {},
      });
    });

    const id = sync.nextEventId({ appId, workspaceId, threadId });

    const attachment: Attachment = {
      type: 'pin',
      x: 10,
      y: 20,
      objectId: 'task-4',
      meta: JSON.stringify({ something: 'foo' }),
    };
    const attachmentId = nanoid();
    const savedAttachment = attachment;

    await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
        attachments: {
          [attachmentId]: attachment,
        },
      },
      timeline: {},
      parentEvent: null,
      newEventId: id,
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
        attachments: {
          [attachmentId]: savedAttachment,
        },
      },
      eventId: id,
      threadId,
      workspaceId,
    });
  });

  test('markSeen', async () => {
    const subs: Subscriptions = {};

    const threadId = nanoid();

    const id = sync.nextEventId({ appId, workspaceId, threadId });
    await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
      },
      timeline: {},
      parentEvent: null,
      newEventId: id,
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

    // todo make this test check seen for another user
    // as send a message now marks it as seen
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

    const id = sync.nextEventId({ appId, workspaceId, threadId });
    await sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      event: {
        type: 'message',
        body: 'Test Message',
        createdAt: Date.now(),
        createdById: userId,
      },
      timeline: {},
      parentEvent: null,
      newEventId: id,
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

    await sync.saveThreadInfo({ appId, workspaceId, threadId, info: value });

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
