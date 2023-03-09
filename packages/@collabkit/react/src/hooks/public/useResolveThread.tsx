import { useThreadContext } from '../useThreadContext';
import { actions } from '@collabkit/client';
import { useCallback } from 'react';
import { useWorkspaceContext } from '../useWorkspaceContext';
import { useStore } from '../useStore';

export function useResolveThread() {
  const store = useStore();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  return useCallback(() => {
    actions.resolveThread(store, { workspaceId, threadId });
  }, [store, workspaceId, threadId]);
}
