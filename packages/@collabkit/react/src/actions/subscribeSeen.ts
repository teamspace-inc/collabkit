import {
  ref,
  onChildAdded,
  DataSnapshot,
  query,
  orderByChild,
  limitToLast,
  onChildMoved,
} from 'firebase/database';
import { DB, Store } from '../constants';
import { getConfig } from './index';

export async function subscribeSeen(store: Store, props: { workspaceId: string }) {
  const { appId, userId } = getConfig(store);
  const { workspaceId } = props;

  const seenQuery = query(
    ref(DB, `/seen/${appId}/${userId}/${workspaceId}`),
    orderByChild('seenUntilId'),
    limitToLast(20)
  );

  function childCallback(snapshot: DataSnapshot) {
    const threadId = snapshot.key;
    if (threadId && workspaceId) {
      const { seenUntilId } = snapshot.val();
      store.workspaces[workspaceId].seen[threadId] = seenUntilId;
    } else {
      console.log('no kley');
    }
  }

  function onError(e: Error) {
    console.error({ e });
  }

  store.subs[`${appId}-${workspaceId}-seen-added`] ||= onChildAdded(
    seenQuery,
    childCallback,
    onError
  );

  store.subs[`${appId}-${workspaceId}-seen-moved`] ||= onChildMoved(
    seenQuery,
    childCallback,
    onError
  );
}
