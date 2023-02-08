import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useReplyCount() {
  const threadId = useThreadContext();
  const { computed } = useSnapshot(useWorkspaceStore());
  return computed[threadId]?.replyCount ?? 0;
}
