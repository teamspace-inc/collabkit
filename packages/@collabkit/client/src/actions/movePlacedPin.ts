import type { Store } from '@collabkit/core';

export async function movePlacedPin(
  store: Store,
  props: { workspaceId: string; objectId: string; pinId: string; x: number; y: number }
) {
  const { workspaceId, objectId, pinId, x, y } = props;
  store.workspaces[workspaceId].pendingPins[objectId] ||= {};
  store.workspaces[workspaceId].pendingPins[objectId][pinId] = {
    x,
    y,
  };
}
