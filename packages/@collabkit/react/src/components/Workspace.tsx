import React, { useContext, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { Theme } from './Theme';

export function useWorkspaceId() {
  const workspaceId = useContext(WorkspaceIDContext);
  if (workspaceId === undefined) throw new Error('useWorkspace must be used within a Workspace');
  return workspaceId;
}

export const WorkspaceIDContext = React.createContext<{ workspaceId: string } | undefined>(
  undefined
);

function Workspace(props: { workspaceId: string; children: React.ReactNode | React.ReactNode[] }) {
  const { store } = useApp();
  const { appState } = useSnapshot(store);
  useEffect(() => {
    if (appState === 'ready') actions.subscribeSeen(store);
  }, [appState, store]);

  return (
    <WorkspaceIDContext.Provider value={{ workspaceId: props.workspaceId }}>
      <Theme>{props.children}</Theme>
    </WorkspaceIDContext.Provider>
  );
}

export { Workspace };
