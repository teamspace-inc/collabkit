import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { ThreadContext } from '../hooks/useThreadContext';

export function ThreadProvider(props: { threadId: string; children?: React.ReactNode }) {
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);
  if (!userId) {
    return null;
  }
  if (!workspaceId) {
    return null;
  }
  return (
    <ThreadContext.Provider value={{ threadId: props.threadId, userId, workspaceId }}>
      {props.children}
    </ThreadContext.Provider>
  );
}
