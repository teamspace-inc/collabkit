import { DB, Store } from '../constants';

import {
  ref,
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  onChildMoved,
  orderByChild,
  query,
} from 'firebase/database';
import { getConfig, timelineRef } from './index';
import { onTimelineEventAdded } from './onTimelineEventAdded';
import { subscribeThread } from './subscribeThread';

export function subscribeToTimeline(
  store: Store,
  props: { workspaceId: string; threadId: string }
) {
  const timeline = timelineRef(store, props.workspaceId, props.threadId);

  if (store.subs[timeline.toString()]) {
    return;
  }

  try {
    store.subs[timeline.toString()] = onChildAdded(timeline, (snapshot) =>
      onTimelineEventAdded(store, snapshot)
    );
  } catch (e) {
    console.error('onChildAdded', e);
  }
}

export function subscribeThreadIsTyping(store: Store, workspaceId: string, threadId: string) {
  const { appId, userId } = getConfig(store);

  const key = `isTyping-${workspaceId}/${threadId}`;
  const addedKey = `${key}-added`;
  const removedKey = `${key}-removed`;

  onDisconnect(ref(DB, `/isTyping/${workspaceId}/${threadId}/${userId}`)).remove();

  if (store.subs[addedKey] && store.subs[removedKey]) {
    return;
  }

  const isTypingRef = ref(DB, `/isTyping/${appId}/${workspaceId}/${threadId}`);

  try {
    store.subs[addedKey] = onChildAdded(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
      if (userId) {
        store.workspaces[workspaceId].composers[threadId].isTyping[userId] = true;
      }
    });
    store.subs[removedKey] = onChildRemoved(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
      if (userId) {
        store.workspaces[workspaceId].composers[threadId].isTyping[userId] = false;
      }
    });
  } catch (e) {
    console.error(e);
  }
}

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

export async function startThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    context?: { selector: string; url: string; point?: { x: number; y: number } };
  }
) {
  subscribeThread(store, props);

  if (props.context) {
    store.viewingId = {
      type: 'stickyThread',
      workspaceId: props.workspaceId,
      threadId: props.threadId,
      context: props.context,
    };
  }

  if (store.uiState === 'selecting') {
    store.uiState = 'idle';
  }
}
