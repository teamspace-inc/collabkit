import React from 'react';
import { useApp } from './useApp';

export function useComposerSendButton(props: {
  workspaceId?: string | null;
  threadId?: string | null;
}) {
  const { workspaceId, threadId } = props;
  const { events } = useApp();
  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId && threadId && e.button === 0) {
        events.onSend(workspaceId, threadId);
      }
    },
  };
}
