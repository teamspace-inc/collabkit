import { CommentTarget, Store } from '../constants';

export function toggleEmojiReactionPicker(store: Store, props: { target: CommentTarget }) {
  store.reactingId = props.target;
}
