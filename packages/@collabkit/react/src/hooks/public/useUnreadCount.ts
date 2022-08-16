import { useApp } from '../useApp';
import { useThreadSubscription } from '../useThread';
import { useWorkspace } from '../useWorkspace';

export function useUnreadCount(props: { threadId: string }): number {
  const { store } = useApp();
  const { workspace, workspaceId } = useWorkspace();
  useThreadSubscription({ store, threadId: props.threadId, workspaceId });

  const seenUntilId = workspace.seen[props.threadId];
  const timeline = workspace.timeline[props.threadId] ?? {};

  if (seenUntilId == null) {
    return Object.keys(timeline).length;
  }

  return Object.keys(timeline).reduce((count, eventId) => {
    // gotcha, this will include reactions and other events
    // that are not messages, which is ok
    // but might be a source of confusion
    // around this number in the future
    if (eventId > seenUntilId) return count + 1;
    return count;
  }, 0);
}
