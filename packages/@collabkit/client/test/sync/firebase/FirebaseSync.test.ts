import { get } from 'firebase/database';
import { nanoid } from 'nanoid';
import { expect, test, describe, beforeAll } from 'vitest';
import { FirebaseSync } from '../../../src/sync/firebase/FirebaseSync';
import { ref } from '../../../src/sync/firebase/refs';
import { setup } from '../../setup';

setup();

let sync: FirebaseSync;

const appId = nanoid();
const apiKey = nanoid();
const userId = nanoid();
const workspaceId = nanoid();

let token: string;

import admin from 'firebase-admin';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { Subscriptions, Sync, ThreadInfo } from '@collabkit/core';

describe('FirebaseSync', () => {
  beforeAll(async () => {
    try {
      await admin
        .database()
        .ref('apps')
        .child(appId)
        .set({
          name: 'Test App',
          admins: {},
          keys: { keys: { [apiKey]: true } },
          mode: 'UNSECURED',
          isEmailDisabled: true,
          defaultNotificationPreference: 'off',
          emailBatchDelayMs: 0,
          logoUrl: '',
          webhook: null,
        });

      await admin
        .database()
        .ref('workspaces')
        .child(appId)
        .child(workspaceId)
        .child('profiles')
        .child(userId)
        .set(true);

      token = await admin
        .auth()
        .createCustomToken(apiKey.toString(), { api: true, appId, mode: 'UNSECURED' });

      await signInWithCustomToken(getAuth(getApp('CollabKit')), token);
    } catch (e) {
      console.error(e, 'Failed to create Test App, some tests will fail');
    }

    sync = new FirebaseSync({ test: true });
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
