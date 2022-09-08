import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useReplyCount() {
  const { threadId } = useThreadContext();
  const timeline = useSnapshot(useWorkspaceStore()).timeline[threadId];
  if (!timeline) {
    return 0;
  }
  const eventIds = Object.keys(timeline);
  const commentCount = eventIds.filter((eventId) => timeline[eventId].type === 'message').length;
  const replyCount = commentCount - 1;
  return replyCount;
}
