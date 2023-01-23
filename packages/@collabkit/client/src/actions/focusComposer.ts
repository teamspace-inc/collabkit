import { Store } from '@collabkit/core';

export function focusComposer(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const composer = store.workspaces[props.workspaceId].composers[props.threadId][props.eventId];
  const { editor } = composer;
  if (!editor) console.warn('CollabKit: focusComposer, no editor found');
  editor?.focus();
  store.composerId = {
    type: 'composer',
    workspaceId: props.workspaceId,
    threadId: props.threadId,
    eventId: props.eventId,
  };
}
