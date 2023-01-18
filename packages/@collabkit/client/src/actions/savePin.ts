import type { Pin, Store } from '@collabkit/core';

export async function savePin(store: Store) {
  const { appId } = store.config;
  const { workspaceId } = store;
  if (!workspaceId) {
    throw new Error('CollabKit: no workspaceId');
  }
  const { pendingPin } = store.workspaces[workspaceId];
  if (!pendingPin) {
    console.warn('CollabKit: no pending pin to save');
    return;
  }
  const pin: Pin = {
    x: pendingPin.x,
    y: pendingPin.y,
    threadId: pendingPin.threadId,
    eventId: pendingPin.eventId,
  };
  const id = await store.sync.savePin({
    appId,
    workspaceId,
    objectId: pendingPin.objectId,
    pin,
  });
  store.workspaces[workspaceId].openPins[pendingPin.objectId] ||= {};
  store.workspaces[workspaceId].openPins[pendingPin.objectId][id] = pin;
  store.workspaces[workspaceId].pendingPin = null;
  return id;
}
