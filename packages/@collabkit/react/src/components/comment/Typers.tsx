import React from 'react';
import { typingIndicatorStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { styled } from '@stitches/react';
import { Profile } from '@collabkit/core';

const StyledIsTypingContainer = styled('div', typingIndicatorStyles.container);

const StyledTyperName = styled('span', typingIndicatorStyles.typerNameText);

function Typer(props: { profile: Profile }) {
  return <StyledTyperName>{props.profile.name || props.profile.email}</StyledTyperName>;
}

export function Typers(props: { userId: string; isTyping?: { [userId: string]: boolean } }) {
  const { store } = useApp();
  const { profiles } = useSnapshot(store);
  const { isTyping, userId } = props;
  if (isTyping == null) {
    return <StyledIsTypingContainer />;
  }

  const typerUserIds = Object.keys(isTyping).filter(
    (_userId) => _userId !== userId && isTyping[_userId] === true
  );

  let component: React.ReactNode | null = null;

  if (typerUserIds.length === 0) {
  } else if (typerUserIds.length === 1) {
    component = <Typer profile={profiles[typerUserIds[0]]} />;
  } else if (typerUserIds.length > 1) {
    component = (
      <span>
        {typerUserIds.map((userId) => (
          <Typer key={`typer-${userId}`} profile={profiles[userId]} />
        ))}
      </span>
    );
  }

  return (
    <StyledIsTypingContainer>
      {component} {component ? 'is typing...' : null}
    </StyledIsTypingContainer>
  );
}
