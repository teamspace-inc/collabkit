import type { Event, Timeline, WithID } from './types';
const DELETE_ID = 'delete-';

export function deletedIds(timeline: Timeline): Readonly<Set<string>> {
  const deleted = new Set<string>();
  for (const eventId of Object.keys(timeline)) {
    const event = timeline[eventId];
    if (event.type === 'delete' && event.parentId) {
      deleted.add(event.parentId);
    }
  }
  return deleted;
}

export function groupedMessages(timeline: Timeline) {
  const eventIds = Object.keys(timeline);

  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));

  const deleted = deletedIds(timeline);
  const messageEvents = events.filter(
    (event) => !deleted.has(event.id) && (event.type === 'message' || event.type === 'system')
  );

  // groups comments by createdById and createdAt chunks
  const list = messageEvents.reduce<WithID<Event>[][]>((groupedEvents, event, i) => {
    const prevEvent = timeline[messageEvents.map((e) => e.id)[i - 1]];
    // since idiomatic use of firebase does not include the eventId inside
    // the event, we need to add it here to make passing the event around
    // in React easier.
    if (prevEvent) {
      if (prevEvent.createdById === event.createdById) {
        if (typeof prevEvent.createdAt === 'number' && typeof event.createdAt === 'number') {
          // 5 minutes before last message and same person results
          // in a grouped message.
          if (prevEvent.createdAt + 1000 * 60 * 5 > event.createdAt) {
            if (groupedEvents[groupedEvents.length - 1]) {
              groupedEvents[groupedEvents.length - 1].push(event);
              return groupedEvents;
            }
          }
        }
      }
    }
    return groupedEvents.concat([[event]]);
  }, []);

  return list;
}

export function messageEvents(timeline: Timeline) {
  const eventIds = Object.keys(timeline);
  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));
  const deleted = deletedIds(timeline);
  return events.filter(
    (event) => !deleted.has(event.id) && (event.type === 'message' || event.type === 'system')
  );
}
export function countMessages(timeline: Timeline) {
  let count = 0;
  const deleted = deletedIds(timeline);
  for (const eventId of Object.keys(timeline)) {
    if (!deleted.has(eventId) && timeline[eventId].type === 'message') {
      count++;
    }
  }
  return count;
}

export function reactionEvents(timeline: Timeline) {
  const eventIds = Object.keys(timeline);
  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));
  return events.filter((event) => event.type === 'reaction');
}

export function reactions(timeline: Timeline) {
  const eventIds = Object.keys(timeline);

  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));

  const reactionEvents = events.filter((event) => event.type === 'reaction');

  // filters out reactions so they can be accessed by
  // comment rendering
  return reactionEvents.reduce<{
    [parentId: string]: { [emojiU: string]: { count: number; userIds: string[] } };
  }>((reactions, event) => {
    const { parentId, body, createdById } = event;
    if (!parentId || event.type !== 'reaction') {
      return reactions;
    }
    reactions[parentId] ||= {};
    const isDelete = body.startsWith(DELETE_ID);
    const emojiU = isDelete ? event.body.split(DELETE_ID)[1] : event.body;
    const reaction = reactions[parentId];
    reaction[emojiU] ||= { count: 0, userIds: [] };
    if (isDelete) {
      reaction[emojiU].count--;
      const index = reaction[emojiU].userIds.findIndex((userId) => userId === createdById);
      reaction[emojiU].userIds.splice(index, 1);
    } else {
      reaction[emojiU].count++;
      reaction[emojiU].userIds.push(createdById);
    }
    if (reaction[emojiU].count <= 0) {
      delete reaction[emojiU];
    }
    return reactions;
  }, {});
}

export function computeIsResolved(timeline: Timeline) {
  const systemEventIds = timeline
    ? Object.keys(timeline).filter(
        (eventId) =>
          (timeline[eventId].type === 'system' && timeline[eventId].system === 'resolve') ||
          timeline[eventId].system === 'reopen'
      )
    : [];

  return !!(
    timeline &&
    systemEventIds.length > 0 &&
    timeline[systemEventIds[systemEventIds.length - 1]].system === 'resolve'
  );
}

export function getReplyCount(timeline: Timeline | undefined) {
  if (!timeline) {
    return 0;
  }
  const eventIds = Object.keys(timeline);
  const deleted = deletedIds(timeline);
  const commentCount = eventIds.filter(
    (eventId) => !deleted.has(eventId) && timeline[eventId].type === 'message'
  ).length;
  const replyCount = commentCount - 1;
  return replyCount;
}

export function findLatestEdit(timeline: Timeline, originalEventId: string) {
  const originalEvent = timeline[originalEventId];
  if (!originalEvent) {
    return null;
  }
  const eventIds = Object.keys(timeline).reverse(); // start from latest
  for (const eventId of eventIds) {
    const event = timeline[eventId];
    if (event.type === 'edit' && event.parentId === originalEventId) {
      return event;
    }
  }
  return null;
}
