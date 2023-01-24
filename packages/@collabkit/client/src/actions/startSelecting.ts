import type { Store } from '@collabkit/core';

export function startSelecting(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  store.uiState = 'selecting';
  store.composerId = {
    type: 'composer',
    workspaceId: props.workspaceId,
    threadId: props.threadId,
    eventId: props.eventId,
  };
}
