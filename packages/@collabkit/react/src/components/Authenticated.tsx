import React from 'react';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';

export function Authenticated({ children }: { children: React.ReactNode }) {
  return useIsAuthenticated() ? <>{children}</> : null;
}
