import { onChildAdded } from 'firebase/database';
import { Store } from '../constants';
import { getConfig, timelineRef } from './index';
import { onTimelineEventAdded } from './onTimelineEventAdded';
import { subscribeThreadIsTyping } from './subscribeThreadIsTyping';
import { subscribeThreadSeenBy } from './subscribeThreadSeenBy';

export async function loadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { appId, userId } = getConfig(store);
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

  subscribeThreadIsTyping(store, props.workspaceId, props.threadId);
  subscribeThreadSeenBy(store, { appId, userId, ...props });
}
