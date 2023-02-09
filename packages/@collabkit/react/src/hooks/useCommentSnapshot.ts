import { useThreadContext } from './useThreadContext';
import { useCommentContext } from './useCommentContext';
import { useWorkspaceStore } from './useWorkspaceStore';
import { useSnapshot } from 'valtio';

export function useCommentSnapshot() {
  const eventId = useCommentContext();
  const threadId = useThreadContext();
  const snapshot = useSnapshot(useWorkspaceStore().computed[threadId]).canonicalEvents[eventId];
  if (!snapshot) throw new Error('Could not find snapshot for comment');
  return snapshot;
}
