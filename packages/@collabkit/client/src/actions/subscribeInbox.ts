import type { Event, Store, WithID } from '@collabkit/core';
import { actions } from './index';
import { createWorkspace } from '../store';

export async function subscribeInbox(store: Store) {
  const { userId, workspaceId, config } = store;
  const appId = config.appId;

  if (!userId || !workspaceId || !appId) {
    return;
  }

  // console.log('Subscribing to Inbox');

  // store.sync.subscribeInbox({ })

  // const inboxRef = query(
  //   ref(getDatabase(getApp('CollabKit')), `views/inbox/${appId}/${workspaceId}`),
  //   orderByChild('createdAt'),
  //   limitToLast(20)
  // );

  // function onError(e: Error) {
  //   console.error('subscribing to inbox', { e });
  // }

  // function childCallback(snapshot: DataSnapshot) {
  //   if (!workspaceId) {
  //     return;
  //   }

  //   const threadId = snapshot.key;

  //   if (!threadId) {
  //     return;
  //   }

  //   // console.log('#inbox', threadId, prevChildName);

  //   const event = snapshot.val();
  //   store.workspaces[workspaceId] ||= createWorkspace();
  //   store.workspaces[workspaceId].inbox[threadId] = { ...event };

  //   // also get all events and listen to this thread

  //   actions.subscribeThread(store, { workspaceId, threadId });
  // }

  function onInboxChange(props: { threadId: string; event: WithID<Event> }) {
    if (!props.threadId) {
      return;
    }

    if (!workspaceId) {
      return;
    }

    // console.log('#inbox', threadId, prevChildName);

    store.workspaces[workspaceId] ||= createWorkspace();
    store.workspaces[workspaceId].inbox[props.threadId] = props.event;

    // also get all events and listen to this thread

    actions.subscribeThread(store, { workspaceId, threadId: props.threadId });
  }

  store.sync.subscribeInbox({ appId, workspaceId, subs: store.subs, onInboxChange });

  // store.subs[`${inboxRef.toString()}#added`] ||= onChildAdded(inboxRef, childCallback, onError);

  // store.subs[`${inboxRef.toString()}#moved`] ||= onChildMoved(inboxRef, childCallback, onError);
}
