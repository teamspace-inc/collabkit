import React from 'react';
import { Theme } from './Theme';

export const WorkspaceIDContext = React.createContext<{ workspaceId: string | null }>({
  workspaceId: null,
});

function Workspace(props: { workspaceId: string; children: React.ReactNode }) {
  return (
    <WorkspaceIDContext.Provider value={{ workspaceId: props.workspaceId }}>
      <Theme>{props.children}</Theme>
    </WorkspaceIDContext.Provider>
  );
}

export { Workspace };
