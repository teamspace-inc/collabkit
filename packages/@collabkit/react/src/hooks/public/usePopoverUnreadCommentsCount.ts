import { Workspace } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useThreadSubscription } from '../useThread';
import { countUnread } from '../../utils/countUnread';
import { useExistingThreadId } from '../useExistingThreadId';

export function usePopoverUnreadCommentsCount(props: { objectId?: string }): number {
  const { store } = useApp();
  const { workspaceId, workspaces, userId } = useSnapshot(store);
  const threadId = props.objectId ? useExistingThreadId({ objectId: props.objectId }) : null;
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  useThreadSubscription({ store, threadId: threadId, workspaceId });

  if (!userId) {
    return 0;
  }

  if (!workspace) {
    return 0;
  }

  if (!threadId) {
    return 0;
  }

  return countUnread({ workspace: workspace as Workspace, threadId: threadId, userId });
}
