import type { Store, EmojiTarget } from '@collabkit/core';
import { writeMessageToFirebase } from './writeMessageToFirebase';

export async function toggleEmoji(store: Store, props: { target: EmojiTarget }) {
  if (!store.userId) {
    console.warn('[CollabKit] Cannot toggle emoji without userId');
    return;
  }

  if (store.isReadOnly) {
    console.warn('[CollabKit] Cannot toggle comment reaction in read-only mode');
    return;
  }

  const { emoji } = props.target;
  const { workspaceId, threadId, eventId } = props.target;

  // check if this user has a last reaction to the comment already
  const reactions =
    store.workspaces[workspaceId].computed[threadId].reactions?.[eventId]?.[emoji.u];
  const body = reactions
    ? reactions.userIds.includes(store.userId)
      ? `delete-${emoji.u}`
      : emoji.u
    : emoji.u;

  try {
    writeMessageToFirebase(store, {
      workspaceId,
      threadId,
      body,
      type: 'reaction',
      // todo write different preview message here
      parentId: eventId,
    });
  } catch (e) {
    console.error(e);
    return;
  }

  store.reactingId = null;
}
