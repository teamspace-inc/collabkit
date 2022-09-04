import React from 'react';

export const ThreadContext = React.createContext<{
  threadId: string;
  userId: string;
  workspaceId: string;
} | null>(null);

export function useThreadContext() {
  const context = React.useContext(ThreadContext);
  if (!context) {
    throw new Error('ThreadContext not found');
  }
  return context;
}
