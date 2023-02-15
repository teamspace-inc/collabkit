import { Store, Target } from '@collabkit/core';

export function select(store: Store, props: { target: Target }) {
  const { userId } = store;
  if (!userId) throw new Error('[CollabKit] select: userId is required');
  store.selectedId = props.target;
  if (props.target.type === 'pin') {
    const { id, workspaceId } = props.target;
    const pin = store.allPins.find((pin) => pin.id === id);
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
