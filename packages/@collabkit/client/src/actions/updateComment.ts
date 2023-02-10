import type { Store } from '@collabkit/core';
import { writeMessageToFirebase } from './writeMessageToFirebase';
import { extract } from '@collabkit/editor';

export async function updateComment(store: Store) {
  if (!store.editingId) {
    console.warn('[CollabKit] cannot update comment, editingId is not defined');
    return;
  }
  const { userId } = store;
  const { workspaceId, threadId, eventId } = store.editingId;
  if (!userId) {
    console.warn('[CollabKit]: cannot edit comment, anonymous user');
    if (store.config.onAuthenticationRequired) {
      store.config.onAuthenticationRequired();
    }
    return;
  }

  const workspace = store.workspaces[workspaceId];
  const composer = workspace.composers[threadId][eventId];
  const { editor, pendingPin } = composer;
  const { body, mentions } = editor ? extract(editor) : { body: '', mentions: [] };

  await writeMessageToFirebase(store, {
    workspaceId,
    threadId,
    body,
    mentions,
    type: 'edit',
    parentId: eventId,
    pin: pendingPin,
  });

  composer.pendingPin = null;
}
