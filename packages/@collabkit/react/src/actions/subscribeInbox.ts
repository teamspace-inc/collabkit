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

export async function subscribeInbox(store: Store) {
  const { appId, workspaceId } = getConfig(store);

  // console.log('Subscribing to Inbox');

  const inboxRef = query(
    ref(DB, `views/inbox/${appId}/${workspaceId}`),
    orderByChild('createdAt'),
    limitToLast(20)
  );

  function onError(e: Error) {
    console.error('subscribing to inbox', { e });
  }

  function childCallback(snapshot: DataSnapshot) {
    if (!workspaceId) {
      return;
    }

    const threadId = snapshot.key;

    if (!threadId) {
      return;
    }

    // console.log('#inbox', threadId, prevChildName);

    const event = snapshot.val();
    store.workspaces[workspaceId].inbox[threadId] = { ...event, id: snapshot.key };
  }

  store.subs[`${inboxRef.toString()}#added`] ||= onChildAdded(inboxRef, childCallback, onError);

  store.subs[`${inboxRef.toString()}#moved`] ||= onChildMoved(inboxRef, childCallback, onError);
}
