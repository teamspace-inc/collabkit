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

  // if (
  //   store.reactingId?.type === props.target.type &&
  //   store.reactingId?.eventId === props.target.eventId &&
  //   store.reactingId?.threadId === props.target.threadId &&
  //   store.reactingId?.workspaceId === props.target.workspaceId
  // ) {
  //   if (props.open) {
  //     store.reactingId = markRaw(props.target);
  //   } else {
  //     store.reactingId = null;
  //   }
  // } else if (props.open) {
  //   store.reactingId = markRaw(props.target);
  // }
}
