import { Timeline, timelineUtils } from '@collabkit/core';
import { newIndicatorStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React, { useEffect, useState } from 'react';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWindowFocus } from '../hooks/useWindowFocus';

const StyledNewIndicatorTextInlay = styled('span', newIndicatorStyles.textInlay);
const StyledNewIndicator = styled('div', newIndicatorStyles.indicator);
const StyledNewIndicatorLine = styled('div', newIndicatorStyles.line);

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
    <StyledNewIndicator>
      <StyledNewIndicatorTextInlay>New</StyledNewIndicatorTextInlay>
      <StyledNewIndicatorLine />
    </StyledNewIndicator>
  );
}
