import { useSnapshot } from 'valtio';
import { useStore } from './useStore';

export function useIsAuthenticated() {
  const store = useStore();

  const { appId, userId, workspaceId } = useSnapshot(store);

  if (!appId) {
    return false;
  }

  if (!workspaceId) {
    return false;
  }

  if (!userId) {
    return false;
  }

  return true;
}
