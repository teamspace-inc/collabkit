import type { CommentTarget, Store } from '@collabkit/core';
import { getConfig } from './index';

export async function seen(store: Store, target: CommentTarget) {
  const { appId, userId, workspaceId } = getConfig(store);
  if (!userId) {
    return;
  }
  if (!document.hasFocus()) {
    return;
  }

  const { threadId, eventId } = target;
  const lastSeenId = store.workspaces[workspaceId].seen[threadId];
  const isNewer = lastSeenId ? eventId > lastSeenId : true;

  if (isNewer) {
    store.workspaces[workspaceId].seen[threadId] = eventId;

    if (store.isReadOnly) {
      console.warn('CollabKit: cannot set seen in read-only mode');
      return;
    }

    try {
      store.sync.markSeen({ appId, userId, workspaceId, threadId, eventId });
    } catch (e) {
      console.error(e);
    }
  }
}
