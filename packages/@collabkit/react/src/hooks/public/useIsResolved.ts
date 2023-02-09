import { useSnapshot } from 'valtio';
import { useThreadContext } from '../useThreadContext';
import { useWorkspaceStore } from '../useWorkspaceStore';

export function useIsResolved() {
  const threadId = useThreadContext();
  const { isResolved } = useSnapshot(useWorkspaceStore()).computed[threadId];
  return isResolved ?? false;
}
