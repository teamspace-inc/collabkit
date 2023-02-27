import { isEqual, Store, Target } from '@collabkit/core';

export function unhover(store: Store, props: { target: Target }) {
  if (isEqual(store.hoveringId, props.target)) {
    store.hoveringId = null;
    switch (props.target.type) {
      case 'comment': {
        const pin = store.workspaces[props.target.workspaceId].eventPins[props.target.eventId];
        if (pin) {
          store.callbacks?.onPinUnhover?.({
            userId: store.userId!,
            objectId:
              store.workspaces[props.target.workspaceId].eventPins[props.target.eventId].objectId,
            workspaceId: props.target.workspaceId,
            threadId: props.target.threadId,
            state: pin.state ?? 'null',
          });
        }
      }
    }
  }
}
