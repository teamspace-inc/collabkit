import { Store } from '@collabkit/core';

export function removePendingPins(store: Store) {
  for (const workspaceId in store.workspaces) {
    for (const pinId in store.workspaces[workspaceId].pins) {
      if (store.workspaces[workspaceId].pins[pinId].state === 'pending') {
        delete store.workspaces[workspaceId].pins[pinId];
      }
    }
  }
}
