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
  if (pinId && objectId) {
    await store.sync.movePin({ appId, workspaceId, pinId, x, y });
    const pin = store.workspaces[workspaceId].openPins[pinId]?.[objectId];
    if (pin) {
      pin.x = x;
      pin.y = y;
    } else {
      console.warn('CollabKit: could not find pin to move', pinId, objectId);
    }
  }

  // todo support moving pending pins
}
