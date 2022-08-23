import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useThreadSubscription } from '../useThread';

export function useUnreadCount(props: { threadId: string }): number {
  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  useThreadSubscription({ store, threadId: props.threadId, workspaceId });

  const seenUntilId = workspace?.seen[props.threadId];
  const timeline = workspace?.timeline[props.threadId] ?? {};

  const messageEventIds = Object.keys(timeline).filter(
    (eventId) => timeline[eventId].type === 'message'
  );

  if (seenUntilId == null) {
    return messageEventIds.length;
  }

  return messageEventIds
    .filter((eventId) => timeline[eventId].type === 'message')
    .reduce((count, eventId) => {
      if (eventId > seenUntilId) return count + 1;
      return count;
    }, 0);
}
