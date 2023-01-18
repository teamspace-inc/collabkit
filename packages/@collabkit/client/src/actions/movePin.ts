import type { Store } from '@collabkit/core';

// provide pinId and objectId to move an existing pin
export async function movePin(
  store: Store,
  props: { x: number; y: number; pinId?: string; objectId?: string }
) {
  const { appId } = store.config;
  const { workspaceId } = store;
  if (!workspaceId) throw new Error('CollabKit: no workspaceId set');
  const { objectId, pinId, x, y } = props;
  const { pendingPin } = store.workspaces[workspaceId];
  if (pinId && objectId) {
    await store.sync.movePin({ appId, workspaceId, pinId, x, y });
    const pin = store.workspaces[workspaceId].openPins[pinId]?.[objectId];
    if (pin) {
      pin.x = x;
      pin.y = y;
    } else {
      console.warn('CollabKit: could not find pin to move', pinId, objectId);
    }
  } else if (pendingPin !== null) {
    store.workspaces[workspaceId].pendingPin;
    pendingPin.x = x;
    pendingPin.y = y;
  } else {
    console.warn('CollabKit: no pending pin or pinId to move', pendingPin);
  }
}
