import { Workspace } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useThreadSubscription } from '../useThread';
import { countUnread } from '../../utils/countUnread';

export function useUnreadCount(props: { threadId: string }): number {
  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  useThreadSubscription({ store, threadId: props.threadId, workspaceId });

  return workspace
    ? countUnread({ workspace: workspace as Workspace, threadId: props.threadId })
    : 0;
}
