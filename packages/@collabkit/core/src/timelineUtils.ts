import type { Event, Timeline, WithID } from './types';

export function groupedMessages(timeline: Timeline) {
  const eventIds = Object.keys(timeline);

  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));

  const messageEvents = events.filter(
    (event) => event.type === 'message' || event.type === 'system'
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

export function groupedTimeline(timeline: Timeline) {
  const eventIds = Object.keys(timeline);
  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));
  const reactionEvents = events.filter((event) => event.type === 'reaction');
  const messageEvents = events.filter(
    (event) => event.type === 'message' || event.type === 'system'
  );

  return {
    reactions: reactions(timeline),
    list: groupedMessages(timeline),
    messageEvents,
    reactionEvents,
  };
}
