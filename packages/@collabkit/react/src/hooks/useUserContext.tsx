import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export type UserContextValue = {
  userId: string;
  workspaceId: string;
};

const UserContext = React.createContext<UserContextValue | null>(null);

export function UserContextProvider(props: { children: React.ReactNode }) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);
  const value = workspaceId && userId ? { workspaceId, userId } : null;
  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}

export function useOptionalUserContext() {
  const context = React.useContext(UserContext);
  return context;
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('UserContext not found');
  }
  return context;
}
