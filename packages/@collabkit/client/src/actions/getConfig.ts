import type { Store } from '@collabkit/core';

// normalises config across secure and unsecure modes for
// safe access from actions

export function getConfig(store: Store) {
  const { config } = store;
  const appId = config.appId;
  const apiKey = 'apiKey' in config ? config.apiKey : null;
  const token = 'token' in config ? config.token : null;
  const mode = token ? 'SECURED' : 'UNSECURED';
  const userId = store.userId;
  const workspaceId = store.workspaceId;

  if (!appId) {
    throw new Error('Missing `appId`');
  }
  if (mode === 'UNSECURED' && !apiKey) {
    throw new Error('Missing `apiKey`');
  }

  if (!userId) {
    throw new Error('Missing `userId`');
  }

  if (!workspaceId) {
    throw new Error('Missing `workspaceId`');
  }

  return { appId, apiKey, token, mode, userId, workspaceId };
}
