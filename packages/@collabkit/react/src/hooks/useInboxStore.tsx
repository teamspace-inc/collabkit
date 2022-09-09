import { useWorkspaceStore } from './useWorkspaceStore';

export function useInboxStore() {
  const workspace = useWorkspaceStore();
  return workspace.inbox;
}
