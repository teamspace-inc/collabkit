import { useSnapshot } from 'valtio';
import { useStore } from './useStore';

export function useOptionalWorkspaceContext() {
  return useSnapshot(useStore()).workspaceId;
}

export function useWorkspaceContext() {
  const workspaceId = useOptionalWorkspaceContext();
  if (!workspaceId) {
    throw new Error('useWorkspaceContext requires authentication');
  }
  return workspaceId;
}
