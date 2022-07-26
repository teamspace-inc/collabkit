import { ref, serverTimestamp, update } from 'firebase/database';
import { CommentTarget, DB, Store } from '../constants';
import { getConfig } from './index';

export async function seen(store: Store, target: CommentTarget) {
  const { appId, userId, workspaceId } = getConfig(store);
  if (store.isReadOnly) {
    console.warn('CollabKit: cannot set seen in read-only mode');
    return;
  }

  const { threadId, eventId } = target;
  const lastSeenId = store.workspaces[workspaceId].seen[threadId];
  const isNewer = lastSeenId ? eventId > lastSeenId : true;

  if (isNewer) {
    store.workspaces[workspaceId].seen[threadId] = eventId;

    const data = {
      seenUntilId: eventId,
      seenAt: serverTimestamp(),
    };

    // console.log('SEEN', userId, data);

    try {
      await update(ref(DB), {
        [`/seen/${appId}/${userId}/${workspaceId}/${threadId}/`]: data,
        [`/views/seenBy/${appId}/${workspaceId}/${threadId}/${userId}`]: data,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
