import { timelineUtils } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useThreadContext } from '../useThreadContext';
import { useWorkspaceStore } from '../useWorkspaceStore';

export function useComments() {
  const threadId = useThreadContext();
  const timeline = useSnapshot(useWorkspaceStore().timeline)[threadId];
  if (timeline == null) {
    return [];
  }
  const deleted = timelineUtils.deletedIds(timeline);
  const eventIds = Object.keys(timeline);
  const messageEventIdsThatAreNotDeleted = eventIds.filter(
    (eventId) => !deleted.has(eventId) && timeline[eventId].type === 'message'
  );
  return messageEventIdsThatAreNotDeleted;
}
