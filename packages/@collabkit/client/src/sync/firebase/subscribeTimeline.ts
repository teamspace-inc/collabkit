import {
  DataSnapshot,
  get,
  onChildAdded,
  orderByChild,
  query,
  startAfter,
} from 'firebase/database';
import { Sync, Subscriptions, FirebaseId } from '@collabkit/core';
import { ref, timelineRef } from './refs';
import { snapshotToEvent } from './converters';

function handleChild(
  snapshot: DataSnapshot,
  cb: (props: {
    threadId: string;
    workspaceId: string;
    eventId: string;
    event: Sync.TimelineChangeEvent['event'];
  }) => void
) {
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
    cb({ threadId, workspaceId, eventId, event });
  }
}

export async function subscribeTimeline({
  subs,
  ...props
}: {
  appId: string;
  workspaceId: string;
  threadId: string;
  subs: Subscriptions;
  onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => void;
  onTimelineGetComplete?: () => void;
  onThreadProfile: (props: Sync.ThreadProfileEvent) => void;
  onThreadProfiles: (props: Sync.ThreadProfilesEvent) => void;
}) {
  const { appId, workspaceId, threadId } = props;
  const timelineQuery = query(
    timelineRef(appId, workspaceId, threadId),
    // this is going to cause problems on larger threads...
    // todo: add pagination
    // limitToLast(50),
    orderByChild('createdAt')
  );

  const threadProfilesQuery = ref`/views/threadProfiles/${appId}/${workspaceId}/${threadId}`;

  const snapshots = await Promise.allSettled([get(timelineQuery), get(threadProfilesQuery)]);

  let lastEventId: string | null = null;

  if (snapshots[1].status === 'fulfilled') {
    const profiles = snapshots[1].value.val();
    profiles &&
      props.onThreadProfiles({
        threadId,
        workspaceId,
        profiles,
      });
  } else {
    console.error('get threadProfiles', snapshots[1].reason);
  }

  if (snapshots[0].status === 'fulfilled') {
    snapshots[0].value.forEach((childSnapshot) => {
      lastEventId = childSnapshot.key;
      handleChild(childSnapshot, props.onTimelineEventAdded);
    });
  } else {
    console.error('get timeline', snapshots[0].reason);
  }

  const newTimelineEventsQuery = query(
    timelineRef(appId, workspaceId, threadId),
    orderByChild('createdAt'),
    startAfter(lastEventId)
  );

  props.onTimelineGetComplete?.();

  if (!subs[threadProfilesQuery.toString()]) {
    subs[threadProfilesQuery.toString()] = onChildAdded(threadProfilesQuery, (snapshot) => {
      if (snapshot.key) {
        props.onThreadProfile({
          threadId,
          workspaceId,
          userId: FirebaseId.decode(snapshot.key),
        });
      }
    });
  }

  if (subs[timelineQuery.toString()]) {
    return;
  }

  try {
    subs[timelineQuery.toString()] = onChildAdded(newTimelineEventsQuery, (snapshot) => {
      handleChild(snapshot, props.onTimelineEventAdded);
    });
  } catch (e) {
    console.error('onChildAdded', e);
  }
}
