import { useCommentContext } from '../hooks/useCommentContext';
import { useThreadContext } from '../hooks/useThreadContext';
import { useTimelineStore } from './useTimelineStore';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useCommentStore() {
  const { eventId } = useCommentContext();
  const { threadId } = useThreadContext();
  const timeline = useWorkspaceStore().timeline[threadId];
  const eventStore = timeline[eventId];
  if (eventStore == null) {
    throw new Error('[useCommentStore] Event not found');
  }
  return eventStore;
}
