import React, { useContext } from 'react';
import { useSnapshot } from 'valtio';
import { Workspace } from '../constants';
import { useApp } from './App';
import { WorkspaceIDContext } from './Workspace';

export const WorkspaceContext = React.createContext<{
  workspace: Workspace | null;
  workspaceId: string | null;
}>({
  workspace: null,
  workspaceId: null,
});

export function WorkspaceLoader(props: { children: React.ReactNode }) {
  const { store } = useApp();
  if (!store) {
    return null;
  }
  const { workspaceId } = useContext(WorkspaceIDContext);
  const { workspaces } = useSnapshot(store);
  const workspace = workspaceId ? (workspaces[workspaceId] as Workspace) : null;
  if (workspaceId && workspace) {
    return (
      <WorkspaceContext.Provider value={{ workspace, workspaceId }}>
        {props.children}
      </WorkspaceContext.Provider>
    );
  } else {
    return null;
  }
}
