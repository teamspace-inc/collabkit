import { timelineUtils, Workspace } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { countUnread } from '../../utils/countUnread';
import { useEffect, useState } from 'react';
import { useStore } from '../useStore';

export function useUnreadThreadsCount(props?: { threadIds?: string[] }): number {
  const store = useStore();
  const { workspaceId, workspaces, userId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const [unreadThreadsCount, setUnreadThreadsCount] = useState<number>(0);

  useEffect(() => {
    if (!workspace) {
      return;
    }
    if (!userId) {
      return;
    }
    let unreadCount = 0;
    for (const threadId in workspace?.timeline) {
      if (props?.threadIds && !props.threadIds.includes(threadId)) {
        continue;
      }
      const isResolved = timelineUtils.computeIsResolved(workspace?.timeline[threadId]);
      if (isResolved) {
        continue;
      }
      const threadUnreadCount = countUnread({
        workspace: workspace as Workspace,
        threadId,
        userId,
      });
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
