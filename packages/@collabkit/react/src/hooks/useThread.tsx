import { useEffect } from 'react';
import { actions } from '@collabkit/client';
import { Store } from '../constants';

export function useThreadSubscription(props: {
  store: Store;
  threadId: string | null;
  workspaceId?: string | null;
}) {
  const { store, threadId, workspaceId } = props;
  useEffect(() => {
    if (workspaceId && threadId) {
      actions.initThread(store, { workspaceId, threadId });
      actions.subscribeThread(store, {
        workspaceId,
        threadId,
      });
    }
  }, [workspaceId, threadId]);
}
