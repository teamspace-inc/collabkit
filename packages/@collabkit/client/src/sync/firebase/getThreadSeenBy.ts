import type { Sync } from '@collabkit/core';
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
    if (childSnapshot.key) {
      seenBy[childSnapshot.key] = childSnapshot.val();
    }
  });

  return seenBy;
}
