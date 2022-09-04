import type { Timeline } from '@collabkit/core';
import { timelineUtils } from '@collabkit/core';

export function useTimeline(timeline: Timeline, seenUntil?: string) {
  return timelineUtils.groupedTimeline(timeline);
}
