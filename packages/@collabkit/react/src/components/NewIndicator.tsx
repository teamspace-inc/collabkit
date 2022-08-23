import { WithHasProfile, WithID, Event } from '@collabkit/core';
import { newIndicatorStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React, { useEffect } from 'react';
import { useWindowFocus } from '../hooks/useWindowFocus';

export function useNewIndicator(props: {
  userId: string;
  messageEvents: WithHasProfile<WithID<Event>>[];
  seenUntil?: string;
}) {
  const { userId, messageEvents, seenUntil } = props;
  const [newIndicatorId, setNewIndicatorId] = React.useState<string | null>(null);

  const isWindowFocused = useWindowFocus();

  useEffect(() => {
    if (!isWindowFocused && !newIndicatorId) {
      const newEventId =
        messageEvents.find((event) => event.createdById !== userId && event.id > seenUntil!)?.id ??
        null;
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
  }, [newIndicatorId, isWindowFocused, seenUntil, userId, messageEvents]);

  return newIndicatorId;
}

const StyledNewIndicatorTextInlay = styled('span', newIndicatorStyles.textInlay);
const StyledNewIndicator = styled('div', newIndicatorStyles.indicator);
const StyledNewIndicatorLine = styled('div', newIndicatorStyles.line);

export function NewIndicator() {
  return (
    <StyledNewIndicator>
      <StyledNewIndicatorTextInlay>New</StyledNewIndicatorTextInlay>
      <StyledNewIndicatorLine />
    </StyledNewIndicator>
  );
}
