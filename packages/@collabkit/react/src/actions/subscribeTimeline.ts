import { Store } from '../constants';
import { onChildAdded } from 'firebase/database';
import { timelineRef } from './index';
import { onTimelineEventAdded } from './onTimelineEventAdded';

export function subscribeTimeline(store: Store, props: { workspaceId: string; threadId: string }) {
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
