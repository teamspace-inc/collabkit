import { useSnapshot } from 'valtio';

import { useApp } from '../hooks/useApp';
import { Workspace } from '../constants';

export function useWorkspace(): { workspace: Workspace; workspaceId: string } {
  const { store, workspaceId } = useApp();
  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  if (workspace == null) {
    throw new Error('[useWorkspace] workspace is undefined');
  }
  return { workspace: workspace as Workspace, workspaceId };
}
