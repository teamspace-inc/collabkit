import type { Attachment, Store } from '@collabkit/core';
import { focusComposer } from './focusComposer';
import { viewContent } from './viewContent';

export function attachComposerPin(
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
  const composer = store.workspaces[workspaceId].composers[threadId][eventId];
  const pinAttachment: Attachment = {
    type: 'pin',
    x,
    y,
    objectId,
    meta: store.callbacks?.onPinAttach?.({ objectId, userId, threadId, workspaceId }) ?? null,
    pending: true,
  };
  composer.attachments[id] = pinAttachment;
  store.uiState = 'idle';
  if (store.composerId) {
    focusComposer(store, store.composerId);
  } else {
    console.warn('no composer to focus');
  }
  setTimeout(() => {
    viewContent(store, {
      target: { type: 'pin', objectId, id, threadId, workspaceId, eventId } as const,
    });
  }, 100);
  return id;
}
