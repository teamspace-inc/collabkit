import { useApp } from '../hooks/useApp';
import { useUserContext } from './useUserContext';

export function useWorkspaceStore() {
  const { store } = useApp();
  const { workspaceId } = useUserContext();
  const workspaceStore = store.workspaces[workspaceId];
  if (workspaceStore == null) {
    throw new Error('[useWorkspaceStore] Workspace not found');
  }
  return workspaceStore;
}
