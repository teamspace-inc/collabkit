import { useThreadContext } from './useThreadContext';
import { useCommentContext } from './useCommentContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useCommentStore() {
  const eventId = useCommentContext();
  const threadId = useThreadContext();
  const commentStore = useWorkspaceStore().computed[threadId].canonicalEvents[eventId];
  if (!commentStore) {
    throw new Error(`Comment store not found for event ${eventId}`);
  }
  return commentStore;
}
