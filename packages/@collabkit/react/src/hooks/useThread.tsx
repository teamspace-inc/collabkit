import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import { ThreadInfo } from '@collabkit/core';
import { Store } from '../constants';

export function useThreadSubscription(props: {
  store: Store;
  threadId: string;
  workspaceId?: string | null;
}) {
  const { store, threadId, workspaceId } = props;
  const { isSignedIn } = useSnapshot(store);
  useEffect(() => {
    if (workspaceId && isSignedIn) {
      actions.subscribeThread(store, {
        workspaceId,
        threadId,
      });
    }
  }, [workspaceId, threadId, isSignedIn]);
}

export function useThread(props: {
  store: Store;
  threadId: string;
  workspaceId?: string | null;
  meta?: unknown;
  threadInfo?: ThreadInfo;
}) {
  const { threadId, workspaceId, store } = props;
  useThreadSubscription({ store, threadId, workspaceId });
}
