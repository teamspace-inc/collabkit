import type { Sync, Subscriptions } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { onChildMoved, orderByChild, query } from 'firebase/database';
import { ref } from './refs';

export function subscribeThreadSeenBy(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onThreadSeenByUser: (event: Sync.ThreadSeenEvent) => void;
}) {
  const seenByQuery = query(
    ref`/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}`,
    orderByChild('seenUntilId')
  );
  if (props.subs[seenByQuery.toString()]) {
    return;
  }
  props.subs[`${seenByQuery.toString()}`] ||= onChildMoved(seenByQuery, (snapshot) => {
    const userId = snapshot.key && FirebaseId.decode(snapshot.key);
    if (userId) {
      props.onThreadSeenByUser({
        workspaceId: props.workspaceId,
        threadId: props.threadId,
        userId,
        data: snapshot.val(),
      });
    }
  });
}
