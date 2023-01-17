import type { Store } from '@collabkit/core';

export async function placePin(
  store: Store,
  props: { workspaceId: string; pinId: string; objectId: string; x: number; y: number }
) {
  const { workspaceId, objectId, x, y, pinId } = props;
  store.workspaces[workspaceId].pendingPins[objectId] ||= {};
  store.workspaces[workspaceId].pendingPins[objectId][pinId] = {
    x,
    y,
  };
}
