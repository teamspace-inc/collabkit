import { timelineUtils } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useThreadContext } from '../useThreadContext';

export function useComments() {
  const { store } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { workspaces } = useSnapshot(store);
  const timeline = workspaces[workspaceId]?.timeline?.[threadId];
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
