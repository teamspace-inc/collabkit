import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../actions';
import { useApp } from './App';
import { Theme } from './Theme';

export const WorkspaceIDContext = React.createContext<{ workspaceId: string | null }>({
  workspaceId: null,
});

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
