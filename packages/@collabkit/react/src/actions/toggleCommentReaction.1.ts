import { push, serverTimestamp } from 'firebase/database';
import { CommentReactionTarget, Event, Store } from '../constants';
import { getConfig, timelineRef } from './index';

export async function toggleCommentReaction(
  store: Store,
  props: { target: CommentReactionTarget }
) {
  const { userId } = getConfig(store);

  const { emoji } = props.target;
  const { workspaceId, threadId, eventId } = props.target.comment;

  // check if this user has a last reaction to the comment already
  const thread = store.workspaces[workspaceId].timeline[threadId];
  const reactions = Object.keys(thread)
    .map((eventId) => thread[eventId])
    .filter(
      (event) => event.parentId === eventId && event.createdById === store.config.identify?.userId
    );

  const lastReaction = reactions.length > 0 ? reactions[reactions.length - 1] : null;

  // toggle logic
  // if we have no a last Reaction we need to check
  // if this is a toggle operation
  const body = lastReaction
    ? // if the last event was clearing the reaction

      // then we want to set it this time
      lastReaction.body.length === 0
      ? emoji
      : // otherwise if the reaction is the same

      // we want to clear it
      emoji === lastReaction.body
      ? ''
      : emoji
    : emoji;

  console.log('reacting with emoji', { body });

  // to remove an existing emoji reaction set
  // body to empty!
  try {
    const event: Event = {
      type: 'reaction',
      body,
      createdAt: serverTimestamp(),
      createdById: userId,
      parentId: eventId,
    };

    const eventRef = await push(timelineRef(store, workspaceId, threadId), event);

    if (eventRef.key) {
      store.workspaces[workspaceId].timeline[threadId] ||= {};
      store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
        ...event,
        createdAt: +Date.now(),
      };

      store.reactingId = null;
    } else {
      console.error('failed to toggle emoji reaction');
      // handle failure here
    }
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
