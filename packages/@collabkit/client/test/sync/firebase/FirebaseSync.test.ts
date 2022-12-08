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
import { Sync } from '@collabkit/core';

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

  test('sendMessage', () => {});
});
