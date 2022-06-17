import React from 'react';

export const WorkspaceContext = React.createContext<{ workspaceId: string | null }>({
  workspaceId: null,
});

function Workspace(props: { workspaceId: string; children: React.ReactElement }) {
  return (
    <WorkspaceContext.Provider value={{ workspaceId: props.workspaceId }}>
      {props.children}
    </WorkspaceContext.Provider>
  );
}

export { Workspace };
