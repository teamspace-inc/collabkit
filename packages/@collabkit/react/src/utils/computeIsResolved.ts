import { Timeline } from '@collabkit/core';

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
