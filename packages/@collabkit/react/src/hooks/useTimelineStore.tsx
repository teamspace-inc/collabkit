import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useTimelineStore() {
  const threadId = useThreadContext();
  const workspaceStore = useWorkspaceStore();
  workspaceStore.timeline[threadId] ??= {};
  return workspaceStore.timeline[threadId];
}
