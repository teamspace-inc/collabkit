import type { Store } from '@collabkit/core';

export async function savePin(
  store: Store,
  props: { workspaceId: string; objectId: string; threadId: string; pinId: string }
) {
  const { appId } = store.config;
  const { workspaceId, objectId, threadId, pinId } = props;
  const { x, y } = store.workspaces[workspaceId].pendingPins[objectId][pinId];
  await store.sync.savePin({ appId, workspaceId, objectId, pinId, pin: { threadId, x, y } });
  const pin = {
    threadId,
    x,
    y,
  };
  store.workspaces[workspaceId].pins[objectId] ||= {};
  store.workspaces[workspaceId].pins[objectId][pinId] = pin;
  store.workspaces[workspaceId].openPins[objectId] ||= {};
  store.workspaces[workspaceId].openPins[objectId][pinId] = pin;
}
