import { Store } from '@collabkit/core';

export function deselectAll(store: Store) {
  if (store.selectedId?.type === 'pin') {
    store.callbacks?.onPinDeselect?.({
      userId: store.userId!,
      objectId: store.selectedId.objectId,
      workspaceId: store.selectedId.workspaceId,
      threadId: store.selectedId.threadId,
      state:
        store.workspaces[store.selectedId.workspaceId].eventPins[store.selectedId.eventId].state ??
        'null',
    });
  }

  store.selectedId = null;
}
