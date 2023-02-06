import React from 'react';
import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';
import { UserContext } from '../hooks/useUserContext';
import { WorkspaceContext } from '../hooks/useWorkspaceContext';

export function AuthenticatedContext(props: { children: React.ReactNode }) {
  const store = useStore();
  const { workspaceId, userId } = useSnapshot(store);
  return (
    <UserContext.Provider value={userId}>
      <WorkspaceContext.Provider value={workspaceId}>{props.children}</WorkspaceContext.Provider>
    </UserContext.Provider>
  );
}
