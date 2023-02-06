import { useApp } from '../hooks/useApp';
import { timelineUtils } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import { useWorkspaceContext } from './useWorkspaceContext';
import { useUserContext } from './useUserContext';
import { useStore } from './useStore';

export function useResolveThread() {
  const store = useStore();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const userId = useUserContext();
  const { workspaces } = useSnapshot(store);

  const workspace = workspaces[workspaceId];
  const timeline = workspace.timeline[threadId];
  const firstCommentId = timeline ? Object.keys(timeline)[0] : null;
  const canResolve = firstCommentId ? timeline[firstCommentId].createdById === userId : false;
  canResolve;
  const isResolved = timelineUtils.computeIsResolved(timeline);

  const resolve = () => {
    actions.resolveThread(store, { workspaceId, threadId });
  };

  const reopen = () => {
    actions.reopenThread(store, { workspaceId, threadId });
  };

  return { isResolved, canResolve, resolve, reopen };
}
