import React from 'react';
import type { Profile } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';

// renders a list of users who are
// typing at the moment
export function CurrentlyTyping(props: {
  userId: string;
  isTyping?: { [userId: string]: boolean };
}) {
  const { store } = useApp();
  const { profiles } = useSnapshot(store);
  const { isTyping, userId } = props;
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
