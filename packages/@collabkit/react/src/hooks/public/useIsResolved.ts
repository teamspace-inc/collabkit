import { timelineUtils } from '@collabkit/core';
import { useTimeline } from '../useTimeline';

export function useIsResolved() {
  const timeline = useTimeline();
  return timeline ? timelineUtils.computeIsResolved(timeline) : false;
}
