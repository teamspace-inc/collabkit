import React from 'react';
import type { Profile } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';

// renders a list of users who are
// typing at the moment
export function CurrentlyTyping(props: {
  profiles: { [userId: string]: Profile };
  userId: string;
  isTyping?: { [userId: string]: boolean };
}) {
  const { profiles, isTyping, userId } = props;
  if (isTyping == null) {
    return null;
  }
  return (
    <>
      {Object.keys(isTyping).map((endUserId) =>
        endUserId !== userId && isTyping[endUserId] === true ? (
          <TypingIndicator key={`typing-${endUserId}`} profile={profiles[endUserId]} />
        ) : null
      )}
    </>
  );
}
