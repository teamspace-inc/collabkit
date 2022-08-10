import { DB, Subscriptions } from '../../constants';
import { ref, onChildMoved, orderByChild, query } from 'firebase/database';
import { ThreadSeenEvent } from '../types';

export function subscribeThreadSeenBy(props: {
  appId: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onThreadSeenByUser: (event: ThreadSeenEvent) => void;
}) {
  const seenByQuery = query(
    ref(DB, `/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}`),
    orderByChild('seenUntilId')
  );
  if (props.subs[seenByQuery.toString()]) {
    return;
  }
  props.subs[`${seenByQuery.toString()}`] ||= onChildMoved(seenByQuery, (snapshot) => {
    const userId = snapshot.key;
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
