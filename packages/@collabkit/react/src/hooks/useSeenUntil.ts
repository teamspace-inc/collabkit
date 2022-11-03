import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';

export function useSeenUntil(): string | undefined {
  const { threadId } = useThreadContext();
  const workspace = useWorkspaceStore();
  return workspace?.seen[threadId];
}
