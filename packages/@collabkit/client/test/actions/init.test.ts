import { expect, test, beforeAll, describe } from 'vitest';
import { init } from '../../src/actions/init';
import { Store } from '@collabkit/core';
import { setupApp, setupFirebase } from '../../../test-utils/src';
import { nanoid } from 'nanoid';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { createStore } from '../../src/store';

setupFirebase();

describe('init', async () => {
  let apiKey;
  let appId;
  let sync;

  beforeAll(() => async () => {
    appId = nanoid();
    apiKey = nanoid();
    await setupApp({ appId, apiKey });
    sync = new FirebaseSync({ test: true });
  });

  test('saves info to store', async () => {
    const store = createStore();
    const userId = nanoid();
    const workspaceId = nanoid();
    expect(store.sync).toBeNull();

    await init(
      store as Store,
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

    let configuredStore = store as Store;

    expect(configuredStore.sync).toBe(sync);
    expect(configuredStore.config.appId).toBe(appId);

    if ('token' in configuredStore.config) {
      console.log('todo test secure mode here');
    } else {
      expect(configuredStore.config.apiKey).toBe(apiKey);
      expect(configuredStore.config.user?.id).toBe(userId);
      expect(configuredStore.config.workspace?.id).toBe(workspaceId);
      expect(configuredStore.config.mentionableUsers).toEqual([]);
    }
  });
});
