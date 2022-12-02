import { onChildAdded, orderByChild, query } from 'firebase/database';
import type { Sync, Subscriptions } from '@collabkit/core';
import { timelineRef } from './refs';
import { snapshotToEvent } from './converters';

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
      const event = snapshotToEvent(snapshot);
      if (!event) {
        return;
      }
      const eventId = event.id;
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
