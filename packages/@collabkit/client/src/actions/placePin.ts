import type { Store } from '@collabkit/core';

export async function placePin(
  store: Store,
  props: { workspaceId: string; objectId: string; threadId: string; x: number; y: number }
) {
  const { appId } = store.config;
  const { workspaceId, objectId, threadId, x, y } = props;
  const id = await store.sync.savePin({ appId, workspaceId, objectId, threadId, x, y });
  if (id) {
    const pin = {
      id,
      threadId,
      x,
      y,
    };
    store.workspaces[workspaceId].pins[objectId] ||= {};
    store.workspaces[workspaceId].pins[objectId][id] = pin;
    store.workspaces[workspaceId].openPins[objectId] ||= {};
    store.workspaces[workspaceId].openPins[objectId][id] = pin;
  }
}
