import { useSnapshot } from 'valtio';

import { useApp } from '../components/App';
import { useWorkspaceId } from '../components/Workspace';
import { Workspace } from '../constants';

export function useWorkspace(): { workspace: Workspace; workspaceId: string } {
  const { store } = useApp();
  const { workspaceId } = useWorkspaceId();
  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  if (workspace == null) {
    throw new Error('[useWorkspace] workspace is undefined');
  }
  return { workspace: workspace as Workspace, workspaceId };
}
