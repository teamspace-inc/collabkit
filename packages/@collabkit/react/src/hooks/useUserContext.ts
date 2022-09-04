import React from 'react';

export const UserContext = React.createContext<{
  userId: string;
  workspaceId: string;
} | null>(null);

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('UserContext not found');
  }
  return context;
}
