import { createComposer } from '../../../client/src/store';
import { useDefaultCommentContext } from './useCommentContext';
import { useThreadContext } from './useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useComposerStore() {
  const workspaceStore = useWorkspaceStore();
  const eventId = useDefaultCommentContext();
  const threadId = useThreadContext();
  if (!workspaceStore.composers[threadId]) {
    workspaceStore.composers[threadId] = {};
  }
  if (!workspaceStore.composers[threadId][eventId]) {
    workspaceStore.composers[threadId][eventId] = createComposer();
  }
  return workspaceStore.composers[threadId][eventId];
}
