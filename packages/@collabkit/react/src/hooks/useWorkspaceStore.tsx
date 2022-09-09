import { useApp } from '../hooks/useApp';
import { useThreadContext } from '../hooks/useThreadContext';

export function useWorkspaceStore() {
  const { store } = useApp();
  const { workspaceId } = useThreadContext();
  const workspaceStore = store.workspaces[workspaceId];
  if (workspaceStore == null) {
    throw new Error('[useWorkspaceStore] Workspace not found');
  }
  return workspaceStore;
}
