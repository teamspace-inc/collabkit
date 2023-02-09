import { useSnapshot } from 'valtio';
import { useEffect, useState } from 'react';
import { useStore } from '../useStore';
import { actions } from '@collabkit/client';

export function useUnreadThreadsCount(props?: { threadIds?: string[] }): number {
  const store = useStore();
  const { workspaceId, workspaces, userId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const [unreadThreadsCount, setUnreadThreadsCount] = useState<number>(0);

  useEffect(() => {
    if (!workspaceId) {
      return;
    }
    if (!workspace) {
      return;
    }
    if (!userId) {
      return;
    }
    let unreadCount = 0;
    for (const threadId in workspace?.timeline) {
      actions.initThread(store, { workspaceId, threadId });
      if (props?.threadIds && !props.threadIds.includes(threadId)) {
        continue;
      }
      const { isResolved } = workspace.computed[threadId];
      if (isResolved) {
        continue;
      }
      const threadUnreadCount = workspace.computed[threadId].unreadCount;
      if (threadUnreadCount > 0) {
        unreadCount++;
      }
    }
    setUnreadThreadsCount(unreadCount);
  }, [
    workspace,
    workspace?.timeline,
    // new events
    (workspace ? Object.keys(workspace?.timeline) : null,
    // seenUntilId changed
    workspace?.seen ? Object.values(workspace?.seen) : null),
    userId,
    props?.threadIds,
  ]);

  return unreadThreadsCount;
}
