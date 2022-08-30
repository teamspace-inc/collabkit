import * as admin from 'firebase-admin';
import { Event } from '../../types';
import { isValidTimeline } from '../helpers/isValidTimeline';

export async function fetchTimeline(props: {
  threadId: string;
  appId: string;
  workspaceId: string;
}) {
  const db = admin.database();
  const { threadId, appId, workspaceId } = props;
  const timelineSnapshot = await db
    .ref(`/timeline/${appId}/${workspaceId}/${threadId}`)
    .orderByKey()
    .get();

  const timeline = timelineSnapshot.val();

  if (!isValidTimeline(timeline)) {
    console.debug('invalid events data, exiting', timeline);
    throw new Error('invalid timeline');
  }

  const timelineWithEventIds: { [eventId: string]: Event & { id: string } } = {};

  for (const eventId in timeline) {
    timelineWithEventIds[eventId] = { ...timeline[eventId], id: eventId };
  }

  return {
    timeline: timelineWithEventIds,
  };
}
