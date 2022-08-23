import { type Timeline, timelineUtils } from '@collabkit/core';

export function useTimeline(timeline: Timeline, seenUntil?: string, userId?: string | null) {
  return timelineUtils.groupedTimeline(timeline);
}
