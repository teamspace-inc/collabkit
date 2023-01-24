import type { Store } from '@collabkit/core';

// provide pinId and objectId to move an existing pin
type MovePinProps = {
  x: number;
  y: number;
} & (
  | {
      type: 'saved';
      pinId: string;
      objectId: string;
    }
  | {
      type: 'pending';
      threadId: string;
      eventId: string;
    }
);

export async function movePin(store: Store, props: MovePinProps) {
  const { appId } = store.config;
  const { workspaceId } = store;
  if (!workspaceId) throw new Error('CollabKit: no workspaceId set');

  const { x, y } = props;
  let pin;
  switch (props.type) {
    case 'saved':
      const { objectId, pinId } = props;
      await store.sync.movePin({ appId, workspaceId, pinId, x, y });
      pin = store.workspaces[workspaceId].openPins[pinId]?.[objectId];

      break;
    case 'pending':
      const { threadId, eventId } = props;
      pin = store.workspaces[workspaceId].composers[threadId]?.[eventId]?.pendingPin;
      break;
  }
  if (pin) {
    pin.x = x;
    pin.y = y;
  }
}
