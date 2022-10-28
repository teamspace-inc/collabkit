import { useApp } from '../useApp';
import { useThreadContext } from '../useThreadContext';
import { actions } from '../../../../client/src/actions';
import { useCallback } from 'react';

export function useResolveThread() {
  const { store } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  return useCallback(() => {
    actions.resolveThread(store, workspaceId, threadId);
  }, [store, workspaceId, threadId]);
}
