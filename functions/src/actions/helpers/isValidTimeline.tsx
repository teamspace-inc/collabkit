import { Timeline } from '../types';
import { isValidEvent } from './isValidEvent';

export function isValidTimeline(data: any): data is Timeline {
  if (typeof data !== 'object') {
    return false;
  }

  const eventIdsValid = Object.keys(data).every((eventId) => typeof eventId === 'string');
  const eventIdsHaveEvents = Object.values(data).every((event) => isValidEvent(event));
  return eventIdsValid && eventIdsHaveEvents;
}
