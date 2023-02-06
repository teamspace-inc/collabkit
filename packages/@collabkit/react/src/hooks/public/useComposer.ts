import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useOptionalCommentContext } from '../useCommentContext';
import { useWorkspaceContext } from '../useWorkspaceContext';
import { useThreadContext } from '../useThreadContext';
import { useUserContext } from '../useUserContext';

export function useComposer() {
  const { events, store } = useApp();
  const threadId = useThreadContext();
  const workspaceId = useUserContext();

  const eventId = useOptionalCommentContext() ?? 'default';
  const { workspaces } = useSnapshot(store);
  const canSend = !!workspaces[workspaceId]?.composers[threadId]?.[eventId].enabled;
  return {
    canSend,
    send: () => {
      events.onSend(workspaceId, threadId);
    },
  };
}
