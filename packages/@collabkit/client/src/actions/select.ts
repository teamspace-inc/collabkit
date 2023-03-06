import { Pin, Store, Target } from '@collabkit/core';

function navigateToPin(store: Store, pin: Pin) {
  const { id, eventId, objectId, threadId, workspaceId } = pin;
  const target = { id, eventId, objectId, threadId, workspaceId, type: 'pin' } as const;
  store.callbacks?.onPinClick?.({
    userId: store.userId!,
    workspaceId: pin.workspaceId,
    meta: pin.meta,
    objectId: pin.objectId,
    threadId: pin.threadId,
  });
  if (!store.isFigmaStyle) return;
  setTimeout(() => {
    store.viewingId = target;
    store.previewingId = target;
    store.selectedId = target;
  }, 32);
}

export function select(store: Store, props: { target: Target }) {
  const { userId } = store;
  const { target } = props;
  if (!userId) throw new Error('[CollabKit] select: userId is required');
  switch (target.type) {
    case 'thread':
      store.selectedId = target;
      break;

    case 'pinNextThreadIconButton':
    case 'pinPrevThreadIconButton':
      const adjacentPin = store.pins.open.find((pin) => pin.id === target.id);
      if (adjacentPin) {
        navigateToPin(store, adjacentPin);
      }
      break;
    case 'pin':
    case 'commentPin':
      const pin = store.pins.open.find((pin) => pin.id === target.id);
      if (pin) {
        navigateToPin(store, pin);
      }
      break;
  }
}
