import { timelineUtils, Workspace } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { countUnread } from '../../utils/countUnread';
import { useEffect, useState } from 'react';

export function useUnreadThreadsCount(): number {
  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const [unreadThreadsCount, setUnreadThreadsCount] = useState<number>(0);

  useEffect(() => {
    if (!workspace) {
      return;
    }
    let unreadCount = 0;
    for (const threadId in workspace?.timeline) {
      const isResolved = timelineUtils.computeIsResolved(workspace?.timeline[threadId]);
      if (isResolved) {
        continue;
      }
      const threadUnreadCount = countUnread({ workspace: workspace as Workspace, threadId });
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
  ]);

  return unreadThreadsCount;
}
