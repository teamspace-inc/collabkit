import type {
  DataSnapshot,
  QueryConstraint} from 'firebase/database';
import {
  get,
  onChildAdded,
  onValue,
  orderByKey,
  query,
  startAfter,
} from 'firebase/database';
import type { Sync, Subscriptions} from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { ref } from './refs';
import { snapshotToEvent } from './converters';

function processChild(snapshot: DataSnapshot) {
  const event = snapshotToEvent(snapshot);
  if (!event) {
    return null;
  }

  const eventId = event.id;
  const workspaceId = snapshot.ref.parent?.ref.parent?.key;
  const threadId = snapshot.ref.parent?.key;
  if (!eventId || !workspaceId || !threadId) {
    return null;
  }

  return {
    threadId,
    workspaceId,
    eventId,
    event,
  };
}

function handleChild(
  snapshot: DataSnapshot,
  cb: (props: {
    threadId: string;
    workspaceId: string;
    eventId: string;
    event: Sync.TimelineChangeEvent['event'];
  }) => void
) {
  const child = processChild(snapshot);
  if (child) cb(child);
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
  onTimelineGetComplete?: (events: Sync.TimelineChangeEvent[]) => void;
  onThreadProfile: (props: Sync.ThreadProfileEvent) => void;
  onThreadProfiles: (props: Sync.ThreadProfilesEvent) => void;
  onThreadResolveChange: (props: Sync.ThreadResolveChangeEvent) => void;
}) {
  const { appId, workspaceId, threadId } = props;
  const timelineQuery = query(
    ref`/timeline/${appId}/${workspaceId}/${threadId}`,
    // this is going to cause problems on larger threads...
    // todo: add pagination
    // limitToLast(50),
    // to add pagination we also need to store computed reactions, edits and isResolved
    // in firebase so we don't need access to the entire event list to render the timeline
    orderByKey()
  );

  const isOpenQuery = ref`/views/isOpen/${appId}/${workspaceId}/${threadId}`;
  const threadProfilesQuery = ref`/views/threadProfiles/${appId}/${workspaceId}/${threadId}`;
  const snapshots = await Promise.allSettled([
    get(timelineQuery),
    get(threadProfilesQuery),
    get(isOpenQuery),
  ]);

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

  const isOpen = snapshots[2].status === 'fulfilled' ? snapshots[2].value.val() : false;

  const events: Sync.TimelineChangeEvent[] = [];
  if (snapshots[0].status === 'fulfilled') {
    snapshots[0].value.forEach((childSnapshot) => {
      lastEventId = childSnapshot.key;
      const child = processChild(childSnapshot);
      if (child) events.push(child);
    });
  } else {
    console.error('get timeline', snapshots[0].reason);
  }

  const constraints: QueryConstraint[] = [orderByKey()];

  if (lastEventId) {
    constraints.push(startAfter(lastEventId));
  }

  const newTimelineEventsQuery = query(
    ref`/timeline/${appId}/${workspaceId}/${threadId}`,
    ...constraints
  );

  props.onTimelineGetComplete?.(events);
  props.onThreadResolveChange?.({ threadId, workspaceId, isResolved: !isOpen });

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

  if (!subs[isOpenQuery.toString()]) {
    subs[threadProfilesQuery.toString()] = onValue(isOpenQuery, (snapshot) => {
      props.onThreadResolveChange?.({
        threadId,
        workspaceId,
        isResolved: !snapshot.exists(),
      });
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
