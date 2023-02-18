import type { Attachment, CommentableTarget, PinAttachment, Store } from '@collabkit/core';
import { focusComposer } from './focusComposer';

export function attachPin(store: Store, target: CommentableTarget) {
  const { appId } = store.config;
  const { userId } = store;
  if (!userId) throw new Error('CollabKit: no userId set');
  const { objectId, x, y, dataPoint } = target;
  const { composerId } = store;
  if (!composerId) throw new Error('CollabKit: no composerId set');
  const { type, ...composerProps } = composerId;
  const { threadId, workspaceId, eventId } = composerProps;
  const id = store.sync.nextPinId({ appId, ...composerProps, objectId });
  const composer = store.workspaces[workspaceId].composers[threadId][eventId];
  const pinAttachment: PinAttachment = {
    type: 'pin',
    x,
    y,
    dataPoint: dataPoint ?? null,
    objectId,
    state: store.callbacks?.onPinAttach?.({ objectId, userId, threadId, workspaceId }) ?? null,
    pending: true,
  };
  composer.attachments[id] = pinAttachment;
  store.uiState = 'idle';
  if (store.composerId) {
    focusComposer(store, store.composerId);
  } else {
    console.warn('no composer to focus');
  }

  return id;
}
