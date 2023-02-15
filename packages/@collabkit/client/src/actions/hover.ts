import { PinTarget, Store, Target } from '@collabkit/core';

export function hover(store: Store, props: { target: Target }) {
  // we don't want to trigger the hover callback if we're selecting a pin
  const { target } = props;
  store.hoveringId = target;
  switch (target.type) {
    case 'comment': {
      if (store.uiState === 'selecting') {
        return;
      }
      store.hoveringId = target;
      const pin = store.workspaces[target.workspaceId].eventPins[target.eventId];
      if (pin) {
        const pinTarget: PinTarget = {
          type: 'pin',
          workspaceId: target.workspaceId,
          objectId: pin.objectId,
          eventId: pin.eventId,
          id: pin.id,
          threadId: target.threadId,
        };
        store.previewingId = pinTarget;
        store.callbacks?.onPinHover?.({
          userId: '',
          objectId: pin.objectId,
          workspaceId: target.workspaceId,
          threadId: target.threadId,
          state: pin.state ?? 'null',
        });
      }
    }
  }
}
