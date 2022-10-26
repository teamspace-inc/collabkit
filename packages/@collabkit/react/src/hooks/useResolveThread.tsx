import React from 'react';
import { useApp } from '../hooks/useApp';
import { timelineUtils } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { useSnapshot } from 'valtio';

export function useResolveThread() {
  const { events, store } = useApp();
  const { threadId, workspaceId, userId } = useThreadContext();
  const { workspaces } = useSnapshot(store);

  const workspace = workspaces[workspaceId];
  const timeline = workspace.timeline[threadId];
  const firstCommentId = timeline ? Object.keys(timeline)[0] : null;
  const canResolve = firstCommentId ? timeline[firstCommentId].createdById === userId : false;
  canResolve;
  const isResolved = timelineUtils.computeIsResolved(timeline);

  const resolve = (e: React.PointerEvent) => {
    events.onPointerDown(e, {
      target: {
        threadId,
        workspaceId,
        type: 'resolveThreadButton',
      },
    });
  };

  const reopen = (e: React.PointerEvent) => {
    events.onPointerDown(e, {
      target: {
        threadId,
        workspaceId,
        type: 'reopenThreadButton',
      },
    });
  };

  return { isResolved, canResolve, resolve, reopen };
}
