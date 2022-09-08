import React from 'react';

export type UserContextValue = {
  userId: string;
  workspaceId: string;
};

export const UserContext = React.createContext<UserContextValue | null>(null);

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('UserContext not found');
  }
  return context;
}
