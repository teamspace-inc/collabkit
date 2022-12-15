import type { CommentTarget, Store } from '@collabkit/core';
import { getConfig } from './index';

export async function seen(store: Store, props: { target: CommentTarget }) {
  const { appId, userId, workspaceId } = getConfig(store);
  if (!userId) {
    console.warn('CollabKit: cannot mark seen, no userId');
    return;
  }

  if (typeof document !== 'undefined' && !document.hasFocus()) {
    console.log('CollabKit: not marking seen, document not defined or focused');
    return;
  }

  const { threadId, eventId } = props.target;
  if (!threadId || !eventId) {
    console.warn('CollabKit: cannot mark seen, no threadId or eventId');
    return;
  }

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
      console.log('CollabKit: error marking seen', {
        appId,
        userId,
        workspaceId,
        threadId,
        eventId,
      });
      console.error(e);
    }
  }
}
