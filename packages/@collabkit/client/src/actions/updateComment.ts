import type { Store } from '@collabkit/core';
import { getConfig } from '.';
import { writeMessageToFirebase } from './writeMessageToFirebase';

export async function updateComment(store: Store) {
  if (!store.editingId) {
    console.warn('[CollabKit] cannot update comment, editingId is not defined');
    return;
  }
  const { workspaceId, threadId, eventId } = store.editingId;
  const { userId } = getConfig(store);
  if (!userId) {
    console.warn('[CollabKit]: cannot send a message, anonymous user');
    if (store.config.onAuthenticationRequired) {
      store.config.onAuthenticationRequired();
    }
    return;
  }

  const workspace = store.workspaces[workspaceId];
  const { $$body: body, $$mentions: mentions } = workspace.composers[threadId];

  await writeMessageToFirebase(store, {
    workspaceId,
    threadId,
    body,
    preview: body,
    mentions,
    type: 'edit',
    parentId: eventId,
  });
}
