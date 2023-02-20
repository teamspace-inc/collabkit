import type { Store } from '@collabkit/core';
import { extract } from '@collabkit/editor';
import { clearAttachments } from './clearAttachments';
import { createEvent } from './createEvent';
import { getConfig } from './getConfig';

export async function updateComment(store: Store) {
  if (!store.editingId) {
    console.warn('[CollabKit] cannot update comment, editingId is not defined');
    return;
  }
  const { userId } = getConfig(store);
  const { workspaceId, threadId, eventId } = store.editingId;
  if (!userId) {
    console.warn('[CollabKit]: cannot edit comment, anonymous user');
    if (store.config.onAuthenticationRequired) {
      store.config.onAuthenticationRequired();
    }
    return;
  }
  const workspace = store.workspaces[workspaceId];
  const parentEvent = store.editingEventSnapshots[eventId];
  if (!parentEvent) {
    console.warn('[CollabKit]: cannot edit comment, parent event not found');
    return;
  }
  const composer = workspace.composers[threadId][eventId];
  const { editor, attachments } = composer;
  const { body, mentions } = editor ? extract(editor) : { body: '', mentions: [] };
  createEvent(store, {
    event: {
      type: 'edit',
      body,
      createdAt: store.sync.serverTimestamp(),
      createdById: userId,
      parentId: eventId,
      mentions,
      attachments,
    },
    parentEvent,
    threadId,
  });
  clearAttachments(store, { workspaceId, threadId, eventId });
}
