import React from 'react';
import { keyframes, styled } from '@stitches/react';
import { Profile } from '../../constants';
import { Avatar } from '../Avatar';
import { StyledCommentContainer } from '../Comment';
import { StyledMessage } from './Message';

const loadingFade = keyframes({
  '0%': { opacity: 0, transform: 'scale(1)' },
  '50%': { opacity: 0.8, transform: 'scale(1.2)' },
  '100%': { opacity: 0, transform: 'scale(1)' },
});

const TypingDot = styled('div', {
  width: 5,
  height: 5,
  background: '$neutral9',
  borderRadius: '50px',
  opacity: 0,
  animation: `${loadingFade} 1.5s infinite`,
});

const TypingDots = styled('div', {
  width: '28px',
  height: '20px',
  display: 'flex',
  gap: '5px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export function TypingIndicator(props: { profile: Profile }) {
  return (
    <StyledCommentContainer ui="bubbles" style={{ left: 5 }} type={'default'}>
      <Avatar profile={props.profile} style={{ position: 'relative', top: 4 }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledMessage ui="bubbles">
          <TypingDots>
            <TypingDot style={{ animationDelay: '0s' }} />
            <TypingDot style={{ animationDelay: '0.2s' }} />
            <TypingDot style={{ animationDelay: '0.4s' }} />
          </TypingDots>
        </StyledMessage>
      </div>
    </StyledCommentContainer>
  );
}
