import type { Store } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { signInWithCustomToken, initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { createWorkspace } from '../store';
import { generateToken } from './generateToken';
import { actions } from './';

export async function authenticate(store: Store) {
  if (!store.sync.shouldAuthenticate()) {
    return;
  }

  const { config } = store;
  const auth = initializeAuth(getApp('CollabKit'), {
    persistence: inMemoryPersistence,
    popupRedirectResolver: undefined,
  });

  // SECURED mode
  if ('token' in config && config.token != null) {
    const userCredential = await signInWithCustomToken(auth, config.token);
    const result = await userCredential.user.getIdTokenResult();
    let { appId, userId, workspaceId, mode } = result.claims;

    if (!appId || !userId || !workspaceId || !mode) {
      throw new Error('invalid claims: ' + JSON.stringify(result.claims));
    }

    if (typeof appId !== 'string') {
      throw new Error('`appId` must be a string');
    }

    if (typeof userId !== 'string') {
      throw new Error('`userId` must be a string');
    }

    if (typeof workspaceId !== 'string') {
      throw new Error('`workspaceId` must be a string');
    }

    appId = FirebaseId.decode(appId);
    userId = FirebaseId.decode(userId);
    workspaceId = FirebaseId.decode(workspaceId);

    const user = await store.sync.getUser({ appId, userId });

    store.userId = userId;

    // user is null when we have an anonymous user
    // as we know given a valid token generateToken succeeded
    // for anonymous users we fallback to a blankish user object 
    store.user = user ?? { id: userId, userId };

    store.workspaceId = workspaceId;
    store.workspaces[workspaceId] = createWorkspace();

    actions.subscribeProfiles(store);
    actions.subscribeWorkspace(store);

    // UNSECURED mode
  } else if ('apiKey' in config) {
    // console.log('authenticating in UNSECURED mode');

    const tokenResponse = await generateToken({
      appId: config.appId,
      apiKey: config.apiKey,
    });

    // userId is the legacy config param, consider depcrecating it
    const userId = config.user?.userId ?? config.user?.id;

    if (!userId) {
      throw new Error('Missing `user.id`');
    }

    if (!config.workspace?.id) {
      throw new Error('Missing `workspace.id`');
    }

    if (!tokenResponse) {
      throw new Error('Failed to auth');
    }

    const userCredential = await signInWithCustomToken(auth, tokenResponse.token);

    const result = await userCredential.user.getIdTokenResult();
    const mode = result.claims.mode;
    if (mode !== 'UNSECURED') {
      throw new Error('invalid claims: ' + JSON.stringify(result.claims));
    }

    store.userId = userId;
    store.user = { ...config.user, id: userId };
    store.workspaceId = config.workspace.id;
    store.workspaces[config.workspace.id] = createWorkspace();

    if (config.workspace.name) {
      store.workspaces[config.workspace.id].name = config.workspace.name;
    }

    // console.log('CollabKit authenticated', userCredential, mode);

    await actions.saveProfile(store);
    actions.subscribeProfiles(store);
    actions.subscribeWorkspace(store);
  } else {
    throw new Error('Missing `token` or `apiKey`');
  }
}
