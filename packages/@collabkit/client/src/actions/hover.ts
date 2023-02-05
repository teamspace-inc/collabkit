import { PinTarget, Store, Target } from '@collabkit/core';

export function hover(store: Store, props: { target: Target }) {
  const { target } = props;
  store.hoveringId = target;
  switch (target.type) {
    case 'comment': {
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
      }
    }
  }
}
