import { ref, serverTimestamp, update } from 'firebase/database';
import { CommentTarget, DB, Store } from '../constants';
import { getConfig } from './index';

export async function seen(store: Store, target: CommentTarget) {
  const { appId, userId } = getConfig(store);

  const { workspaceId, threadId, eventId } = target;
  const lastSeenId = store.workspaces[workspaceId].seen[threadId];
  const isNewer = lastSeenId ? eventId > lastSeenId : true;

  if (isNewer) {
    store.workspaces[workspaceId].seen[threadId] = eventId;

    console.log('SEEN', eventId, threadId, workspaceId);

    const data = {
      seenUntilId: eventId,
      seenAt: serverTimestamp(),
    };

    try {
      await update(ref(DB), {
        [`/seen/${appId}/${userId}/${workspaceId}/${threadId}/`]: data,
        [`/views/seenBy/${appId}/${workspaceId}/${threadId}/${userId}`]: data,
      });
    } catch (e) {
      // error is expected if already seen
      // console.error(e);
    }
  }
}
