import { getReplyCount } from '@collabkit/core/src/timelineUtils';
import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useReplyCount() {
  const threadId = useThreadContext();
  const timeline = useSnapshot(useWorkspaceStore()).timeline[threadId];
  return getReplyCount(timeline);
}
