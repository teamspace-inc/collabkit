import { Subscriptions } from '../../constants';
import { onChildAdded } from 'firebase/database';
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
  const timeline = timelineRef(props.appId, props.workspaceId, props.threadId);

  if (subs[timeline.toString()]) {
    return;
  }

  try {
    subs[timeline.toString()] = onChildAdded(timeline, (snapshot) => {
      const event = snapshot.val();
      const eventId = snapshot.key;
      const workspaceId = snapshot.ref.parent?.ref.parent?.key;
      const threadId = snapshot.ref.parent?.key;

      // console.log('got event');

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
