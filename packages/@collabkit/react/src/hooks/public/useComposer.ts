import { useSnapshot } from 'valtio';
import { useApp } from '../useApp';
import { useOptionalCommentContext } from '../useCommentContext';
import { useThreadContext } from '../useThreadContext';

export function useComposer() {
  const { events, store } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };
  const { workspaces } = useSnapshot(store);
  const canSend = !!workspaces[workspaceId]?.composers[threadId]?.[eventId].enabled;
  const hasMentions = workspaces[workspaceId]?.composers[threadId]?.[eventId]?.mentions.length > 0;
  return {
    canSend,
    send: () => {
      events.onSend(workspaceId, threadId);
    },
    hasMentions,
  };
}
