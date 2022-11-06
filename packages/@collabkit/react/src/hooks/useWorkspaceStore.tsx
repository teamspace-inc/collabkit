import { useApp } from '../hooks/useApp';
import { useOptionalUserContext, useUserContext } from './useUserContext';

export function useWorkspaceStore() {
  const { store } = useApp();
  const { workspaceId } = useUserContext();
  const workspaceStore = store.workspaces[workspaceId];
  if (workspaceStore == null) {
    throw new Error('[useWorkspaceStore] Workspace not found');
  }
  return workspaceStore;
}

export function useOptionalWorkspaceStore() {
  const { store } = useApp();
  const userContext = useOptionalUserContext();
  return userContext ? store.workspaces[userContext.workspaceId] : null;
}
