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
        store.callbacks?.onPinHover?.({
          userId: '',
          objectId: pin.objectId,
          workspaceId: target.workspaceId,
          threadId: target.threadId,
          meta: pin.meta,
        });
      }
    }
  }
}
