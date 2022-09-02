import React from 'react';
import { typingIndicatorStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { styled } from '@stitches/react';
import type { Profile } from '@collabkit/core';

const StyledIsTypingContainer = styled('div', typingIndicatorStyles.container);
const Name = styled('span', typingIndicatorStyles.name);

type Props = { userId: string; isTyping?: { [userId: string]: boolean } };

export function Typers(props: Props) {
  const { store } = useApp();
  const { profiles } = useSnapshot(store);
  const names = getNames(props, profiles);

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

function getNames(props: Props, profiles: { [profileId: string]: Profile }) {
  const isTyping = props.isTyping;
  if (isTyping == null) {
    return [];
  }
  const ids = Object.keys(isTyping).filter((id) => id !== props.userId && isTyping[id] === true);
  return ids
    .map((id) => profiles[id]?.name || profiles[id]?.email)
    .filter((name): name is string => typeof name === 'string' && !!name);
}
