import type { Sync, Subscriptions } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { get, orderByChild, query } from 'firebase/database';
import { ref } from './refs';

export async function getThreadSeenBy(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
}) {
  const seenByQuery = query(
    ref`/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}`,
    orderByChild('seenUntilId')
  );

  const snapshot = await get(seenByQuery);
  if (!snapshot.exists()) {
    return {};
  }

  let seenBy: Record<string, Sync.ThreadSeenEvent['data']> = {};
  snapshot.forEach((childSnapshot) => {
    const userId = childSnapshot.key && FirebaseId.decode(childSnapshot.key);
    if (userId) {
      seenBy[userId] = childSnapshot.val();
    }
  });

  return seenBy;
}
