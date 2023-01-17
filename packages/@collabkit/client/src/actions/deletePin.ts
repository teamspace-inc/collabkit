import type { Store } from '@collabkit/core';

export async function deletePin(
  store: Store,
  props: { workspaceId: string; objectId: string; pinId: string }
) {
  const { appId } = store.config;
  const { workspaceId, objectId, pinId } = props;
  await store.sync.deletePin({ appId, workspaceId, objectId, pinId });
  store.workspaces[workspaceId].pins[objectId] ||= {};
  delete store.workspaces[workspaceId].pins[objectId][pinId];
  store.workspaces[workspaceId].openPins[objectId] ||= {};
  delete store.workspaces[workspaceId].openPins[objectId][pinId];
}
