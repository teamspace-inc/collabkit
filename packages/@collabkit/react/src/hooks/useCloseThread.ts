import React from 'react';
import { useApp } from '../hooks/useApp';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceContext } from './useWorkspaceContext';

export function useCloseThread() {
  const { events } = useApp();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();

  const closeThread = (e: React.PointerEvent) => {
    events.onClick(e, {
      target: {
        threadId,
        workspaceId,
        type: 'closeThreadButton',
      },
    });
  };

  return { close: closeThread };
}
