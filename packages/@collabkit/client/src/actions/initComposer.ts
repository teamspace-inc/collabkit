import { Store, UnconfiguredStore } from '@collabkit/core';
import { createComposer } from '../store';

export function initComposer(
  store: Store | UnconfiguredStore,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const composers = store.workspaces[workspaceId].composers;
  composers[threadId] ??= {};

  if (!composers[threadId][eventId]) {
    composers[threadId][eventId] = createComposer();

    if (store.workspaces[workspaceId].eventPins[eventId]) {
      composers[threadId][eventId].pendingPin = {
        ...store.workspaces[workspaceId].eventPins[eventId],
        isPending: true,
      };
    }
  }

  composers[threadId][eventId] ??= createComposer();
  return composers[threadId][eventId];
}
