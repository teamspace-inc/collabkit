import { Pin, Store, WithID } from '@collabkit/core';

export function findPinByEventId(store: Store, eventId: string): WithID<Pin> | null {
  const { workspaceId } = store;
  if (!workspaceId) {
    throw new Error('CollabKit: cannot find pin, no workspaceId');
  }
  const workspace = store.workspaces[workspaceId];
  const pins = workspace.openPins;
  for (const objectId in pins) {
    for (const pinId in pins[objectId]) {
      const pin = pins[objectId][pinId];
      if (pin.eventId === eventId) {
        return { ...pin, id: pinId };
      }
    }
  }
  return null;
}
