import { useSnapshot } from 'valtio';

import { useApp } from '../hooks/useApp';
import { Workspace } from '../constants';

export function useWorkspace(): { workspace: Workspace; workspaceId: string } {
  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  if (workspaceId == null) {
    throw new Error('[useWorkspace] workspace is undefined');
  }
  const workspace = workspaces[workspaceId];
  if (workspace == null) {
    throw new Error('[useWorkspace] workspace is undefined');
  }
  return { workspace: workspace as Workspace, workspaceId };
}
