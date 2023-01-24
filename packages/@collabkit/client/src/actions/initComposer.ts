import { Store, UnconfiguredStore } from '@collabkit/core';
import { createComposer } from '../store';

export function initComposer(
  store: Store | UnconfiguredStore,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const composers = store.workspaces[workspaceId].composers;
  composers[threadId] ??= {};
  composers[threadId][eventId] ??= createComposer();
  return composers[threadId][eventId];
}
