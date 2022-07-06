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

export async function subscribeSeen(store: Store) {
  const { appId, workspaceId, userId } = getConfig(store);

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

  store.subs[`${appId}-${workspaceId}-seen-added`] ||= onChildAdded(
    seenQuery,
    childCallback,
    (error) => {
      console.error('seen: ', error);
    }
  );

  store.subs[`${appId}-${workspaceId}-seen-moved`] ||= onChildMoved(
    seenQuery,
    childCallback,
    (error) => {
      console.error('seen: ', error);
    }
  );
}
