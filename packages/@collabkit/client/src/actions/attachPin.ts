import type { Store } from '@collabkit/core';
import { focusComposer } from './focusComposer';

export function attachPin(
  store: Store,
  props: {
    x: number;
    y: number;
    objectId: string;
  }
) {
  const { appId } = store.config;
  const { userId } = store;
  if (!userId) throw new Error('CollabKit: no userId set');
  const { x, y, objectId } = props;
  const { composerId } = store;
  if (!composerId) throw new Error('CollabKit: no composerId set');
  const { type, ...composerProps } = composerId;
  const { threadId, workspaceId, eventId } = composerProps;
  const id = store.sync.nextPinId({ appId, ...composerProps, objectId });
  const composer =
    store.workspaces[composerId.workspaceId].composers[composerId.threadId][composerId.eventId];
  composer.pendingPin = {
    id,
    threadId,
    workspaceId,
    eventId,
    x,
    y,
    objectId,
    createdById: userId,
    isPending: true,
    state: store.callbacks?.onPinAttach?.({ objectId, userId, threadId, workspaceId }) ?? {},
  };
  store.uiState = 'idle';
  // for some reason this is needed to focus the composer
  // this is buggy need to debug events
  store.composerId ? focusComposer(store, store.composerId) : console.warn('no composer to focus');

  return id;
}
