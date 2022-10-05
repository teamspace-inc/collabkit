import { Timeline, timelineUtils } from '@collabkit/core';
import React, { useEffect, useState } from 'react';
import { useWindowFocus } from '../hooks/useWindowFocus';
import * as styles from '../styles/components/NewIndicator.css';

export function useNewIndicator(props: {
  userId?: string | null;
  timeline: Timeline | null;
  seenUntil?: string;
}) {
  const { userId } = props;
  const messageEvents = timelineUtils.messageEvents(props.timeline ?? {});
  const { seenUntil } = props;

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

export function NewIndicator() {
  return (
    <div className={styles.root}>
      <div className={styles.line} />
      <span className={styles.textInlay}>New</span>
    </div>
  );
}
