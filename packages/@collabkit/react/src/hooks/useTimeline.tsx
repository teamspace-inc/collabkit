import { useSnapshot } from 'valtio';
import { useThreadContext } from './useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useTimeline() {
  const { threadId } = useThreadContext();
  const { timeline } = useSnapshot(useWorkspaceStore());
  return timeline[threadId];
}
