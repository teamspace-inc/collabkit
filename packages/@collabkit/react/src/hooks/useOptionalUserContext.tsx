import React from 'react';
import { UserContext } from './useUserContext';

export function useOptionalUserContext() {
  return React.useContext(UserContext);
}
