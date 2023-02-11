import { Event } from '../../types';
import { isValidTimeline } from '../helpers/isValidTimeline';
import * as FirebaseId from './FirebaseId';
import { ref } from './refs';

export async function fetchTimeline(props: {
  threadId: string;
  appId: string;
  workspaceId: string;
}) {
  const { threadId, appId, workspaceId } = props;
  const timelineSnapshot = await ref`/timeline/${appId}/${workspaceId}/${threadId}`
    .orderByKey()
    .get();

  const timeline = timelineSnapshot.val();

  if (!isValidTimeline(timeline)) {
    console.debug('invalid events data, exiting', timeline);
    throw new Error('invalid timeline');
  }

  const timelineWithEventIds: { [eventId: string]: Event & { id: string } } = {};

  for (const eventId in timeline) {
    const event = timeline[eventId];
    const mentions: Event['mentions'] = {};
    for (const id of Object.keys(event.mentions ?? {})) {
      mentions[FirebaseId.decode(id)] = true;
    }
    timelineWithEventIds[eventId] = {
      ...event,
      id: eventId,
      createdById: FirebaseId.decode(event.createdById),
      mentions,
    };
  }

  return {
    timeline: timelineWithEventIds,
  };
}
