import React from 'react';

export const UserContext = React.createContext<string | null>(null);

export function useUserContext() {
  const context = useOptionalUserContext();
  if (!context) {
    throw new Error('UserContext not found');
  }
  return context;
}

export function useOptionalUserContext() {
  return React.useContext(UserContext);
}
