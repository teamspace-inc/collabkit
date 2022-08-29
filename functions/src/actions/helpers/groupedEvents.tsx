import { Event, TimelineWithEventId } from '../../types';

export function groupedEvents(
  messageEvents: (Event & { id: string })[],
  timeline: TimelineWithEventId
) {
  return messageEvents.reduce<(Event & { id: string })[][]>((groupedEvents, event, i) => {
    const prevEvent = timeline[messageEvents.map((e) => e.id)[i - 1]];
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
    const toReturn = groupedEvents.concat([[event]]) as (Event & { id: string })[][];
    return toReturn;
  }, []);
}
