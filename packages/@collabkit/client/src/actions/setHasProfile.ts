import { Store } from '@collabkit/core';

export function setHasProfile(store: Store, userId: string) {
  for (const workspaceId in store.workspaces) {
    for (const threadId in store.workspaces[workspaceId].timeline) {
      for (const eventId in store.workspaces[workspaceId].timeline[threadId]) {
        if (store.workspaces[workspaceId].timeline[threadId][eventId].createdById === userId) {
          store.workspaces[workspaceId].timeline[threadId][eventId].hasProfile = true;
        }
      }
    }
  }
}
