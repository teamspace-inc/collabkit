import { useSnapshot } from 'valtio';
import { useWorkspaceStore } from './useWorkspaceStore';
import { useThreadContext } from './useThreadContext';

export function useCommentList() {
  const threadId = useThreadContext();
  const workspaceStore = useWorkspaceStore();
  const { computed } = useSnapshot(workspaceStore);
  const { hasFetchedAllProfiles, messageEvents } = computed[threadId] ?? {};
  return hasFetchedAllProfiles ? messageEvents : [];
}
