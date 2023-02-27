import { useSnapshot } from 'valtio';
import { useThreadContext } from '../useThreadContext';
import { useWorkspaceStore } from '../useWorkspaceStore';

export function useIsResolved() {
  const threadId = useThreadContext();
  return useSnapshot(useWorkspaceStore()).isResolved[threadId] ?? false;
}
