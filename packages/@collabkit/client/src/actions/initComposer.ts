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
  }

  const event = store.workspaces?.[workspaceId].timeline?.[threadId]?.[eventId];
  if (event) {
    composers[threadId][eventId].attachments = event.attachments ?? {};
  }

  return composers[threadId][eventId];
}
