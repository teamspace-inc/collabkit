import { useSnapshot } from 'valtio';
import { useThreadSubscription } from '../useThread';
import { useExistingThreadId } from '../useExistingThreadId';
import { useStore } from '../useStore';

export function usePopoverUnreadCommentsCount(props: { objectId?: string }): number {
  const store = useStore();
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

  return workspace.computed[threadId]?.unreadCount ?? 0;
}
