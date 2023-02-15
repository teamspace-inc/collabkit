import { ComposerTarget, Store } from '@collabkit/core';

export function focusComposer(store: Store, target: ComposerTarget) {
  // editor.focus() doesn't work for some reason
  // but calling it on the _rootElement does.
  setTimeout(() => {
    const composer =
      store.workspaces[target.workspaceId].composers[target.threadId][target.eventId];
    const { editor } = composer;
    if (!editor) return;
    editor?._rootElement?.focus();
  }, 32);
}
