import React from 'react';

export const WorkspaceContext = React.createContext<string | null>(null);

export function useOptionalWorkspaceContext() {
  return React.useContext(WorkspaceContext);
}

export function useWorkspaceContext() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceContext must be used within an WorkspaceContextProvider');
  }
  return context;
}
