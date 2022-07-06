import { ref, query, orderByChild, onChildMoved } from 'firebase/database';
import { DB, Store } from '../constants';

export function subscribeThreadSeenBy(
  store: Store,
  props: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }
) {
  const seenByQuery = query(
    ref(DB, `/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}`),
    orderByChild('seenUntilId')
  );
  store.subs[`${props.workspaceId}-${props.threadId}-threadSeenBy`] ||= onChildMoved(
    seenByQuery,
    (snapshot) => {
      const userId = snapshot.key;
      if (!userId) {
        return;
      }
      store.workspaces[props.workspaceId].seenBy[props.threadId] ||= {};
      store.workspaces[props.workspaceId].seenBy[props.threadId][userId] = snapshot.val();
    }
  );
}
