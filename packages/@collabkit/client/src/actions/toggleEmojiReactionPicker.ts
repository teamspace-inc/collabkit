import { CommentTarget, Store } from '@collabkit/core';

export function toggleEmojiReactionPicker(store: Store, props: { target: CommentTarget }) {
  store.reactingId = props.target;
}
