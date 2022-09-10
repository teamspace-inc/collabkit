import type { Event, Timeline, WithHasProfile, WithID } from './types';

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

export function reactions(timeline: Timeline) {
  const eventIds = Object.keys(timeline);

  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));

  const reactionEvents = events.filter((event) => event.type === 'reaction');

  // filters out reactions so they can be accessed by
  // comment rendering
  const reactions = reactionEvents.reduce<{ [parentId: string]: { [createdById: string]: Event } }>(
    (reactions, event, i) => {
      if (!event.parentId) {
        return reactions;
      }
      reactions[event.parentId] ||= {};
      reactions[event.parentId][event.createdById] = event;
      return reactions;
    },
    {}
  );
  return reactions;
}

export function messageEvents(timeline: Timeline) {
  const eventIds = Object.keys(timeline);
  const events: WithHasProfile<WithID<Event>>[] = eventIds.map((eventId) => ({
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
  const events: WithHasProfile<WithID<Event>>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));
  return events.filter((event) => event.type === 'reaction');
}

export function groupedTimeline(timeline: Timeline) {
  return {
    reactions: reactions(timeline),
    list: groupedMessages(timeline),
    messageEvents: messageEvents(timeline),
    reactionEvents: reactionEvents(timeline),
  };
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
