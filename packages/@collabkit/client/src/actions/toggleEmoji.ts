import type { Store, EmojiTarget } from '@collabkit/core';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { createEvent } from './createEvent';

export async function toggleEmoji(store: Store, props: { target: EmojiTarget }) {
  const { userId } = store;
  if (!userId) {
    console.warn('[CollabKit] Cannot toggle emoji without userId');
    return;
  }
  if (store.isReadOnly) {
    console.warn('[CollabKit] Cannot toggle comment reaction in read-only mode');
    return;
  }
  const { emoji } = props.target;
  const { workspaceId, threadId, eventId } = props.target;
  const parentEvent = store.workspaces[workspaceId].timeline[threadId][eventId];
  // check if this user has a last reaction to the comment already
  const reactions =
    store.workspaces[workspaceId].computed[threadId].reactions?.[eventId]?.[emoji.u];
  const body = reactions
    ? // if they have reacted already, mark this as a delete
      reactions.userIds.includes(userId)
      ? `delete-${emoji.u}`
      : emoji.u
    : emoji.u;
  createEvent(store, {
    event: {
      type: 'reaction',
      body,
      createdAt: store.sync.serverTimestamp(),
      createdById: userId,
      parentId: eventId,
    },
    parentEvent,
    threadId,
  });
  closeEmojiReactionPicker(store);
}
