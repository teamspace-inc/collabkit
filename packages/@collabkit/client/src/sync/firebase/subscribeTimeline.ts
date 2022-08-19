import { onChildAdded, orderByChild, query } from 'firebase/database';
import type { Sync, Subscriptions } from '@collabkit/core';
import { timelineRef } from './refs';

export function subscribeTimeline({
  subs,
  ...props
}: {
  appId: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => void;
}) {
  const timelineQuery = query(
    timelineRef(props.appId, props.workspaceId, props.threadId),
    // limitToLast(50),
    orderByChild('createdAt')
  );

  if (subs[timelineQuery.toString()]) {
    return;
  }

  try {
    subs[timelineQuery.toString()] = onChildAdded(timelineQuery, (snapshot) => {
      const event = snapshot.val();
      const eventId = snapshot.key;
      const workspaceId = snapshot.ref.parent?.ref.parent?.key;
      const threadId = snapshot.ref.parent?.key;

      // todo validate data here
      //
      if (threadId && workspaceId && eventId) {
        props.onTimelineEventAdded({ threadId, workspaceId, eventId, event });
      }
    });
  } catch (e) {
    console.error('onChildAdded', e);
  }
}
