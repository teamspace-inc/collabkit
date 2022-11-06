import type { Store, Target, ThreadTarget } from '@collabkit/core';

function isSameThread(a: Target | null, b: Target) {
  return (
    a !== null &&
    b !== null &&
    a.type === 'thread' &&
    b.type === 'thread' &&
    a.type === b.type &&
    a.workspaceId === b.workspaceId &&
    a.threadId === b.threadId
  );
}

export function showPreview(store: Store, props: { target: ThreadTarget }) {
  // console.log('showPreview', props);

  // todo @nc:
  // for some reason on hover, this action is triggered twice
  // for now to avoid doubling the re-renders we check if the target
  // is the same as the one we are already previewing
  if (!isSameThread(store.previewingId, props.target)) {
    store.previewingId = props.target;
  }
}
