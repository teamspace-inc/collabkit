import { Store } from '@collabkit/core';

export function removePendingPin(
  store: Store,
  props: { workspaceId: string; eventId: string; threadId: string }
) {
  console.log('removePendingPin', props);
  store.workspaces[props.workspaceId].composers[props.threadId][props.eventId].pendingPin = null;
  store.uiState = 'idle';
}
