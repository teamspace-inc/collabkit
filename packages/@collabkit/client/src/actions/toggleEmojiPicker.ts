import type { CommentEmojiButtonTargets, Store } from '@collabkit/core';
import { markRaw } from '../store';

export function toggleEmojiPicker(
  store: Store,
  props: { target: CommentEmojiButtonTargets; open: boolean }
) {
  if (props.open) {
    store.reactingId = markRaw(props.target);
  } else {
    store.reactingId = null;
  }
}
