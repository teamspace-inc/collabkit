import { timelineUtils } from '@collabkit/core';
import { useEffect, useState } from 'react';
import { useTimeline } from '../hooks/useTimeline';
import { useUserContext } from '../hooks/useUserContext';
import { useWindowFocus } from '../hooks/useWindowFocus';
import { useSeenUntil } from './useSeenUntil';

export function useNewIndicator() {
  const { userId } = useUserContext();
  const timeline = useTimeline();
  const seenUntil = useSeenUntil();
  const messageEvents = timelineUtils.messageEvents(timeline ?? {});

  const [newIndicatorId, setNewIndicatorId] = useState<string | null>(null);
  const isWindowFocused = useWindowFocus();

  useEffect(() => {
    if (userId) {
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
  }, [newIndicatorId, isWindowFocused, seenUntil, userId, messageEvents]);

  return newIndicatorId;
}
