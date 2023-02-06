import { useStore } from './useStore';
import { useOptionalWorkspaceContext } from './useWorkspaceContext';

export function useWorkspaceStore() {
  const workspaceStore = useOptionalWorkspaceStore();
  if (workspaceStore == null) {
    throw new Error('[useWorkspaceStore] Workspace not found');
  }
  return workspaceStore;
}

export function useOptionalWorkspaceStore() {
  const store = useStore();
  const workspaceId = useOptionalWorkspaceContext();
  return workspaceId ? store.workspaces[workspaceId] : null;
}
