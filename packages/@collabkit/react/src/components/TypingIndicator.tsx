import React from 'react';

import { styled } from '@stitches/react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';

import { typingIndicatorStyles } from '@collabkit/theme';
import type { Profile } from '@collabkit/core';
import { useThreadContext } from '../hooks/useThreadContext';

const StyledIsTypingContainer = styled('div', typingIndicatorStyles.container);
const Name = styled('span', typingIndicatorStyles.name);

function getNames(props: {
  userId: string;
  isTyping?: { [userId: string]: boolean };
  profiles: { [profileId: string]: Profile };
}) {
  const isTyping = props.isTyping;
  if (isTyping == null) {
    return [];
  }
  const ids = Object.keys(isTyping).filter((id) => id !== props.userId && isTyping[id] === true);
  return ids
    .map((id) => props.profiles[id]?.name || props.profiles[id]?.email)
    .filter((name): name is string => typeof name === 'string' && !!name);
}

export function TypingIndicator() {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store } = useApp();
  const { profiles, workspaces } = useSnapshot(store);
  const workspace = workspaces[workspaceId];
  const isTyping = workspace?.composers[threadId]?.isTyping;
  const names = getNames({ userId, isTyping, profiles });

  if (names === null) return null;
  if (names.length === 0) return <StyledIsTypingContainer />;
  if (names.length === 1)
    return (
      <StyledIsTypingContainer>
        <Name>{names[0]}</Name> is typing…
      </StyledIsTypingContainer>
    );
  if (names.length === 2)
    return (
      <StyledIsTypingContainer>
        <Name>{names[0]}</Name> and <Name>{names[1]}</Name> are typing…
      </StyledIsTypingContainer>
    );
  if (names.length === 3)
    return (
      <StyledIsTypingContainer>
        <Name>{names[0]}</Name>, <Name>{names[1]}</Name> and <Name>{names[2]}</Name> are typing…
      </StyledIsTypingContainer>
    );
  return (
    <StyledIsTypingContainer>
      <Name>{names[0]}</Name>, <Name>{names[1]}</Name> and <Name>{names.length - 2} others</Name>{' '}
      are typing…
    </StyledIsTypingContainer>
  );
}
