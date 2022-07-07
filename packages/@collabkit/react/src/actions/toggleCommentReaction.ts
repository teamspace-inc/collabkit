import { Store, CommentReactionTarget } from '../constants';
import { writeMessageToFirebase } from './writeMessageToFirebase';

export async function toggleCommentReaction(
  store: Store,
  props: { target: CommentReactionTarget }
) {
  if (!store.config.identify) {
    console.warn('[CollabKit] Did you forget to call CollabKit.identify?');
    return;
  }

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

  try {
    writeMessageToFirebase(store, {
      workspaceId,
      threadId,
      body,
      type: 'reaction',
      // todo write different preview message here
      preview: body,
      parentId: eventId,
    });
  } catch (e) {
    return;
  }

  store.reactingId = null;
}
