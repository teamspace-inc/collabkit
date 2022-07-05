import React, { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { Workspace } from '../constants';
import { useApp } from './App';
import { useWorkspaceId } from './Workspace';

export const WorkspaceContext = React.createContext<
  | {
      workspace: Workspace;
      workspaceId: string;
    }
  | undefined
>(undefined);

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (value === undefined) throw new Error('useWorkspace must be used within a Workspace');
  return value;
}

export function WorkspaceLoader(props: { children: React.ReactNode }) {
  const { store } = useApp();
  const { workspaceId } = useWorkspaceId();
  const { workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  const value = { workspace, workspaceId } as { workspace: Workspace; workspaceId: string };
  if (value.workspace) {
    return <WorkspaceContext.Provider value={value}>{props.children}</WorkspaceContext.Provider>;
  } else {
    return null;
  }
}
