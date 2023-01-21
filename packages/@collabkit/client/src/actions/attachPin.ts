import type { Store } from '@collabkit/core';
import { insertComposerPin } from './insertComposerPin';

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
  store.pin = {
    id,
    ...composerProps,
    x,
    y,
    objectId,
  };
  store.uiState = 'idle';
  insertComposerPin(store, {
    pinId: id,
  });
  return id;
}
