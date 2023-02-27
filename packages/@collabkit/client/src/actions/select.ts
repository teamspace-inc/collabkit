import { Store, Target } from '@collabkit/core';

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
      const pinTarget = { ...target, type: 'pin' } as const;
      store.selectedId = pinTarget;
      store.viewingId = pinTarget;
      store.previewingId = pinTarget;
      break;
    case 'pin':
    case 'commentPin':
      const { id, workspaceId } = target;
      const pin = store.pins.open.find((pin) => pin.id === id);
      store.selectedId = target;
      if (pin) {
        store.callbacks?.onPinClick?.({
          userId,
          workspaceId,
          meta: pin.meta,
          objectId: pin.objectId,
          threadId: pin.threadId,
        });
        if (!store.isFigmaStyle) return;
        setTimeout(() => {
          store.viewingId = target;
          store.previewingId = target;
        }, 32);
      }
      break;
  }
}
