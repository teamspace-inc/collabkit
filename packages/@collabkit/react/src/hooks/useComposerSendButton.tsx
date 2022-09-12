import React from 'react';
import { useSnapshot } from 'valtio';
// import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function useComposerSendButton(props: {
  workspaceId?: string | null;
  threadId?: string | null;
}) {
  const { workspaceId, threadId } = props;
  const { events } = useApp();
  // const { workspaces } = useSnapshot(store);
  // const bodyLength =
  //   workspaceId && threadId
  //     ? workspaces[workspaceId]?.composers[threadId]?.$$body.trim().length ?? 0
  //     : 0;
  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId && threadId && e.button === 0) {
        events.onSend(workspaceId, threadId);
      }
    },
  };
}
