import { get, orderByChild, query } from 'firebase/database';
import type { Event } from '@collabkit/core';
import { timelineRef } from './refs';
import { snapshotToEvent } from './converters';

export async function getTimeline({
  ...props
}: {
  appId: string;
  workspaceId: string;
  threadId: string;
}) {
  const timelineQuery = query(
    timelineRef(props.appId, props.workspaceId, props.threadId),
    // this is going to cause problems on larger threads...
    // todo: add pagination
    // limitToLast(50),
    orderByChild('createdAt')
  );

  const snapshot = await get(timelineQuery);
  if (!snapshot.exists()) {
    return null;
  }

  const events: Event[] = [];
  snapshot.forEach((childSnapshot) => {
    const event = snapshotToEvent(childSnapshot);
    if (!event) {
      return;
    }
    events.push(event);
  });
  return events;
}
