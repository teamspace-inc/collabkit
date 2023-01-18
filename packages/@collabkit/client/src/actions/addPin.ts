import type { Store } from '@collabkit/core';

export async function addPin(
  store: Store,
  props: {
    workspaceId: string;
    pin: {
      x: number;
      y: number;
      threadId: string;
      eventId: 'default' | string;
      objectId: string;
    };
  }
) {
  const { workspaceId, pin } = props;
  store.workspaces[workspaceId].pendingPin = pin;
}
