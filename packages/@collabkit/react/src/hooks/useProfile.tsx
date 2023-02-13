import React from 'react';

export const ProfileContext = React.createContext<string | null>(null);

export function useProfileContext() {
  const context = React.useContext(ProfileContext);
  if (context == null) {
    throw new Error('[useProfile] Profile context not found');
  }
  return context;
}
