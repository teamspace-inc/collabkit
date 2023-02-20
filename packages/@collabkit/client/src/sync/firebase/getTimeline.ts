import { get, orderByChild, query } from 'firebase/database';
import type { Event, Timeline, WithID } from '@collabkit/core';
import { ref } from './refs';
import { snapshotToEvent } from './converters';

export async function getTimeline({
  ...props
}: {
  appId: string;
  workspaceId: string;
  threadId: string;
}) {
  const { appId, workspaceId, threadId } = props;
  const timelineQuery = query(
    ref`/timeline/${appId}/${workspaceId}/${threadId}`,
    // this is going to cause problems on larger threads...
    // todo: add pagination
    // limitToLast(50),
    orderByChild('createdAt')
  );

  const snapshot = await get(timelineQuery);
  if (!snapshot.exists()) {
    return null;
  }

  const events: WithID<Event>[] = [];
  snapshot.forEach((childSnapshot) => {
    const event = snapshotToEvent(childSnapshot);
    if (!event) {
      return;
    }
    events.push(event);
  });
  const timeline: Timeline = {};
  for (const event of events) {
    timeline[event.id] = event;
  }
  return timeline;
}
