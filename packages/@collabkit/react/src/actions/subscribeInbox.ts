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

  console.log('Subscribing to Inbox');

  const inboxRef = query(
    ref(DB, `views/inbox/${appId}/${workspaceId}`),
    orderByChild('createdAt'),
    limitToLast(20)
  );

  function childCallback(snapshot: DataSnapshot, prevChildName?: string | null) {
    if (!workspaceId) {
      return;
    }

    const threadId = snapshot.key;

    if (!threadId) {
      return;
    }

    console.log('#inbox', threadId, prevChildName);

    const event = snapshot.val();
    store.workspaces[workspaceId].inbox[threadId] = { ...event, id: snapshot.key };
  }

  store.subs['inbox#added'] ||= onChildAdded(inboxRef, childCallback, (error) => {
    console.error('Error subscribing to Inbox', error);
  });

  store.subs['inbox#moved'] ||= onChildMoved(inboxRef, childCallback, (error) => {
    console.error('Error subscribing to Inbox', error);
  });
}
