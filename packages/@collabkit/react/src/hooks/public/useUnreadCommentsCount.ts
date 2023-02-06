import { Workspace } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useThreadSubscription } from '../useThread';
import { countUnread } from '../../utils/countUnread';
import { useStore } from '../useStore';

export function useUnreadCommentsCount(props: { threadId: string }): number {
  const store = useStore();
  const { workspaceId, workspaces, userId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  useThreadSubscription({ store, threadId: props.threadId, workspaceId });

  if (!userId) {
    return 0;
  }

  if (!workspace) {
    return 0;
  }

  return countUnread({ workspace: workspace as Workspace, threadId: props.threadId, userId });
}
