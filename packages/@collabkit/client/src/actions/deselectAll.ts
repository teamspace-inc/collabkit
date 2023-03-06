import { Store } from '@collabkit/core';

export function deselectAll(store: Store) {
  if (store.selectedId?.type === 'pin') {
    const pin = store.workspaces[store.selectedId.workspaceId].eventPins[store.selectedId.eventId];
    if (!pin.meta) return;
    store.callbacks?.onPinDeselect?.({
      userId: store.userId!,
      objectId: store.selectedId.objectId,
      workspaceId: store.selectedId.workspaceId,
      threadId: store.selectedId.threadId,
      meta: pin.meta,
    });
  }

  store.selectedId = null;
}
