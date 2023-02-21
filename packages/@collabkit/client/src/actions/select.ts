import { Store, Target } from '@collabkit/core';

export function select(store: Store, props: { target: Target }) {
  const { userId } = store;
  if (!userId) throw new Error('[CollabKit] select: userId is required');
  if (
    props.target.type === 'pinNextThreadIconButton' ||
    props.target.type === 'pinPrevThreadIconButton'
  ) {
    const target = { ...props.target, type: 'pin' } as const;
    store.selectedId = target;
    store.viewingId = target;
    store.previewingId = target;
  } else {
    store.selectedId = props.target;
  }
  if (props.target.type === 'pin' || props.target.type === 'commentPin') {
    const { id, workspaceId } = props.target;
    const pin = store.pins.open.find((pin) => pin.id === id);
    if (pin) {
      store.callbacks?.onPinClick?.({
        userId,
        workspaceId,
        state: pin.state ?? 'null',
        objectId: pin.objectId,
      });
    }
  }
}
