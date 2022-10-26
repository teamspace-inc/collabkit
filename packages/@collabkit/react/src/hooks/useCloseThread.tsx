import React from 'react';
import { useApp } from '../hooks/useApp';
import { useThreadContext } from '../hooks/useThreadContext';

export function useCloseThread() {
  const { events } = useApp();
  const { threadId, workspaceId } = useThreadContext();

  const close = (e: React.PointerEvent) => {
    events.onPointerDown(e, {
      target: {
        threadId,
        workspaceId,
        type: 'closeThreadButton',
      },
    });
  };

  return { close };
}