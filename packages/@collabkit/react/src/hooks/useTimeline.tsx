import { type Timeline, timelineUtils } from '@collabkit/core';

export function useTimeline(timeline: Timeline) {
  return timelineUtils.groupedTimeline(timeline);
}
