import { useEffect, useState } from 'react';
import { useUserContext } from './useUserContext';
import { useWindowFocus } from '../hooks/useWindowFocus';
import { useSeenUntil } from './useSeenUntil';
import { useThreadContext } from './useThreadContext';
import { useWorkspaceStore } from './useWorkspaceStore';
import { useSnapshot } from 'valtio';

export function useNewIndicator() {
  const userId = useUserContext();
  const threadId = useThreadContext();
  const { messageEvents } = useSnapshot(useWorkspaceStore().computed)[threadId] ?? {};
  const seenUntil = useSeenUntil();

  const [newIndicatorId, setNewIndicatorId] = useState<string | null>(null);
  const isWindowFocused = useWindowFocus();

  useEffect(() => {
    if (userId && messageEvents) {
      if (!isWindowFocused && !newIndicatorId) {
        const newEventId =
          messageEvents.find((event) => event.createdById !== userId && event.id > seenUntil!)
            ?.id ?? null;
        if (newEventId) {
          setNewIndicatorId(newEventId);
        }
      } else {
        const aNewerEventFromTheCurrentUser = newIndicatorId
          ? messageEvents.find((event) => event.id > newIndicatorId && event.createdById === userId)
          : null;
        if (aNewerEventFromTheCurrentUser) {
          setNewIndicatorId(null);
        }
      }
    }
  }, [newIndicatorId, isWindowFocused, seenUntil, userId, messageEvents?.length]);

  return newIndicatorId;
}
