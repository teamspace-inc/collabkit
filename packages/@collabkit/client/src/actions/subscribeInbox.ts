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
import { actions } from './index';
import { createWorkspace } from '../store';

export async function subscribeInbox(store: Store) {
  const { userId, workspaceId, config } = store;
  const appId = config.appId;

  if (!userId || !workspaceId || !appId) {
    return;
  }

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
    store.workspaces[workspaceId] ||= createWorkspace();
    store.workspaces[workspaceId].inbox[threadId] = { ...event, id: snapshot.key };

    // also get all events and listen to this thread

    actions.subscribeThread(store, { workspaceId, threadId });
  }

  store.subs[`${inboxRef.toString()}#added`] ||= onChildAdded(inboxRef, childCallback, onError);

  store.subs[`${inboxRef.toString()}#moved`] ||= onChildMoved(inboxRef, childCallback, onError);
}
