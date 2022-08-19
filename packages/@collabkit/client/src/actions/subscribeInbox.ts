import { getApp } from 'firebase/app';
import {
  ref,
  onChildAdded,
  DataSnapshot,
  query,
  orderByChild,
  limitToLast,
  onChildMoved,
  getDatabase,
} from 'firebase/database';
import type { Store } from '@collabkit/core';
import { getConfig } from './index';

export async function subscribeInbox(store: Store) {
  const { appId, workspaceId } = getConfig(store);

  // console.log('Subscribing to Inbox');

  const inboxRef = query(
    ref(getDatabase(getApp('CollabKit')), `views/inbox/${appId}/${workspaceId}`),
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
