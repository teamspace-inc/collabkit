import { Subscriptions } from '../../constants';
import { onChildAdded, orderByChild, query } from 'firebase/database';
import { timelineRef } from './refs';
import { TimelineChangeEvent } from '../types';

export function subscribeTimeline({
  subs,
  ...props
}: {
  appId: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onTimelineEventAdded: (event: TimelineChangeEvent) => void;
}) {
  const timelineQuery = query(
    timelineRef(props.appId, props.workspaceId, props.threadId),
    // limitToLast(50),
    orderByChild('createdAt')
  );

  if (subs[timelineQuery.toString()]) {
    console.log('subbed already');
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
