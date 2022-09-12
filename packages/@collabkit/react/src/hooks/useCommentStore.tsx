import { timelineUtils } from '@collabkit/core';
import { useCommentContext } from '../hooks/useCommentContext';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useCommentStore() {
  const { eventId } = useCommentContext();
  const { threadId } = useThreadContext();
  const timeline = useWorkspaceStore().timeline[threadId];
  const eventStore = timelineUtils.findLatestEdit(timeline, eventId) ?? timeline[eventId];
  if (eventStore == null) {
    throw new Error('[useCommentStore] Event not found');
  }
  return eventStore;
}
