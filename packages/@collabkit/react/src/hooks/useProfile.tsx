import React from 'react';
import { ProfileContext } from './ProfileContext';

export function useProfileContext() {
  const context = React.useContext(ProfileContext);
  if (context == null) {
    throw new Error('[useProfile] Profile context not found');
  }
  return context;
}
