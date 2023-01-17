import type { Store } from '@collabkit/core';

export async function moveSavedPin(
  store: Store,
  props: { workspaceId: string; objectId: string; pinId: string; x: number; y: number }
) {
  const { appId } = store.config;
  const { workspaceId, objectId, pinId, x, y } = props;
  await store.sync.movePin({ appId, workspaceId, pinId, x, y });
  const pin = store.workspaces[workspaceId].pins[objectId][pinId];
  pin.x = x;
  pin.y = y;
  const openPin = store.workspaces[workspaceId].openPins[objectId][pinId];
  openPin.x = x;
  openPin.y = y;
}
