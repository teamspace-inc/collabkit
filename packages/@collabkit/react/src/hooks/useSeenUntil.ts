import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';

export function useSeenUntil(): string | undefined {
  const { threadId } = useThreadContext();
  const workspace = useSnapshot(useWorkspaceStore());
  return workspace?.seen[threadId];
}
