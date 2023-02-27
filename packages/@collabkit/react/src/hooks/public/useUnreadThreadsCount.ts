import { useSnapshot } from 'valtio';
import { useEffect, useState } from 'react';
import { useStore } from '../useStore';
import { actions } from '@collabkit/client';
import { useIsAuthenticated } from '../useIsAuthenticated';

export function useUnreadThreadsCount(props?: { threadIds?: string[] }): number {
  const store = useStore();
  const isAuthenticated = useIsAuthenticated();
  const { workspaceId, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const [unreadThreadsCount, setUnreadThreadsCount] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (!workspaceId) {
      return;
    }
    if (!workspace) {
      return;
    }
    let unreadCount = 0;
    for (const threadId in workspace?.timeline) {
      actions.initThread(store, { workspaceId, threadId });
      if (props?.threadIds && !props.threadIds.includes(threadId)) {
        continue;
      }
      if (workspace.isResolved[threadId]) {
        continue;
      }
      const threadUnreadCount = workspace.computed[threadId].unreadCount;
      if (threadUnreadCount > 0) {
        unreadCount++;
      }
    }
    setUnreadThreadsCount(unreadCount);
  }, [
    isAuthenticated,
    workspace,
    workspace?.timeline,
    // new events
    (workspace ? Object.keys(workspace?.timeline) : null,
    // seenUntilId changed
    workspace?.seen ? Object.values(workspace?.seen) : null),
    props?.threadIds,
  ]);

  return unreadThreadsCount;
}
