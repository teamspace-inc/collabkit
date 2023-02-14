import type { Store } from '@collabkit/core';
import { extract } from '@collabkit/editor';
import { clearComposerAttachments } from './clearAttachments';
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
  const parentEvent = workspace.timeline[threadId][eventId];
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
  clearComposerAttachments(store, { workspaceId, threadId, eventId });
}
