import type { Store } from '@collabkit/core';

export function attachPin(
  store: Store,
  props: {
    x: number;
    y: number;
    objectId: string;
  }
) {
  const { appId } = store.config;
  const { x, y, objectId } = props;
  const { composerId } = store;
  if (!composerId) throw new Error('CollabKit: no composerId set');
  const { type, ...composerProps } = composerId;
  const id = store.sync.nextPinId({ appId, ...composerProps, objectId });
  const composer =
    store.workspaces[composerId.workspaceId].composers[composerId.threadId][composerId.eventId];
  composer.pendingPin = {
    id,
    ...composerProps,
    x,
    y,
    objectId,
    isPending: true,
  };
  store.uiState = 'idle';
  // insertComposerPin(store, {
  //   pinId: id,
  // });
  return id;
}
