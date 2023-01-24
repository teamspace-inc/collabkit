import { useOptionalCommentContext } from './useCommentContext';
import { useWorkspaceStore } from './useWorkspaceStore';

export function useComposerStore() {
  const composerStore = useOptionalComposerStore();
  if (!composerStore) {
    throw new Error('[useComposerStore] Composer not found');
  }
  return composerStore;
}

export function useOptionalComposerStore() {
  const workspaceStore = useWorkspaceStore();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };
  return workspaceStore.composers[eventId];
}
