import type { Store } from '@collabkit/core';

export async function addPin(
  store: Store,
  props: {
    workspaceId: string;
    objectId: string;
    pin: {
      x: number;
      y: number;
      threadId: string;
      eventId: 'default' | string;
    };
  }
) {
  const { workspaceId, objectId, pin } = props;
  store.workspaces[workspaceId].pendingPin = { objectId, ...pin };
}
