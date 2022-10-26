import { Store } from '@collabkit/core';

export function nextThread(store: Store, incr: number = 1) {
  const viewingId = store.viewingId;
  if (!viewingId || viewingId.type !== 'thread') {
    return;
  }

  const { workspaceId, threadId } = viewingId;
  const workspace = store.workspaces[workspaceId];
  const threadIds = Object.keys(workspace.inbox);
  const index = threadIds.indexOf(threadId);
  const nextIndex = index + incr;

  if (nextIndex < 0 || nextIndex >= threadIds.length) {
    return;
  }

  const nextThreadId = threadIds[nextIndex];

  // next cycle to skip closeThread being set
  setTimeout(() => {
    store.viewingId = {
      type: 'thread',
      workspaceId,
      threadId: nextThreadId,
    };
  }, 1);
}
