import type { CommentTarget, Store } from '@collabkit/core';

export function toggleEmojiPicker(store: Store, props: { target: CommentTarget; open: boolean }) {
  if (
    store.reactingId?.type === props.target.type &&
    store.reactingId?.eventId === props.target.eventId
  ) {
    if (props.open) {
      store.reactingId = props.target;
    } else {
      store.reactingId = null;
    }
  } else if (props.open) {
    store.reactingId = props.target;
  }
}
