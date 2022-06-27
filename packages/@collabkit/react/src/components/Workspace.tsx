import React from 'react';

export const WorkspaceIDContext = React.createContext<{ workspaceId: string | null }>({
  workspaceId: null,
});

function Workspace(props: { workspaceId: string; children: React.ReactNode }) {
  return (
    <WorkspaceIDContext.Provider value={{ workspaceId: props.workspaceId }}>
      {props.children}
    </WorkspaceIDContext.Provider>
  );
}

export { Workspace };
