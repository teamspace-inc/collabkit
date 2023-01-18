import type { Store } from '@collabkit/core';

export async function savePin(store: Store) {
  const { appId } = store.config;
  const { workspaceId } = store;
  if (!workspaceId) {
    throw new Error('CollabKit: no workspaceId');
  }
  const pin = store.workspaces[workspaceId].pendingPin;
  if (!pin) {
    console.warn('CollabKit: no pending pin to save');
    return;
  }
  const id = await store.sync.savePin({ appId, workspaceId, objectId: pin.objectId, pin });
  store.workspaces[workspaceId].openPins[pin.objectId] ||= {};
  store.workspaces[workspaceId].openPins[pin.objectId][id] = pin;
  store.workspaces[workspaceId].pendingPin = null;
  return id;
}
