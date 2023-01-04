import { ThreadInfo } from '@collabkit/core';
import React from 'react';

export type ThreadContextValue = {
  threadId: string;
  userId: string;
  workspaceId: string;

  // config
  placeholder?: string;
  autoFocus?: boolean;
  showHeader?: boolean;
  info?: ThreadInfo;
};

export const ThreadContext = React.createContext<ThreadContextValue | null>(null);

export function useThreadContext() {
  const context = React.useContext(ThreadContext);
  if (!context) {
    throw new Error('ThreadContext not found');
  }
  return context;
}
