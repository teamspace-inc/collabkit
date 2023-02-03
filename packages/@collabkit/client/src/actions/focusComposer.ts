import { ComposerTarget, Store } from '@collabkit/core';

export function focusComposer(store: Store, target: ComposerTarget) {
  const composer = store.workspaces[target.workspaceId].composers[target.threadId][target.eventId];
  const { editor } = composer;
  if (!editor) console.warn('CollabKit: focusComposer, no editor found');
  editor?.focus();
  store.composerId = target;
}
