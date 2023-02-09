import React from 'react';

export type ThreadContextValue = string;

export const ThreadContext = React.createContext<ThreadContextValue | null>(null);

export function useThreadContext() {
  const context = React.useContext(ThreadContext);
  if (!context) {
    throw new Error('ThreadContext not found');
  }
  return context;
}
