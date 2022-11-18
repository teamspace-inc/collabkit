import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useThreadContext } from '../useThreadContext';

export function useComposer() {
  const { events, store } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { workspaces } = useSnapshot(store);
  const canSend = !!workspaces[workspaceId]?.composers[threadId]?.enabled.default;

  return {
    canSend,
    send: () => {
      events.onSend(workspaceId, threadId);
    },
  };
}
