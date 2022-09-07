import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useTimelineStore() {
  const { threadId } = useThreadContext();
  const workspaceStore = useWorkspaceStore();
  const timelineStore = workspaceStore.timeline[threadId];
  if (timelineStore == null) {
    throw new Error('[useTimelineStore] Timeline not found');
  }
  return timelineStore;
}
