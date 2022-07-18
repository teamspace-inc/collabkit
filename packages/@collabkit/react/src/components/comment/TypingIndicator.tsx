import React from 'react';
import { styled } from '@stitches/react';
import { Profile } from '../../constants';
// import { Avatar } from '../Avatar';
import { StyledCommentContainer } from '../Comment';
import { StyledMessage } from './MessageHeader';

// const loadingFade = keyframes({
//   '0%': { opacity: 0, transform: 'scale(1)' },
//   '50%': { opacity: 0.8, transform: 'scale(1.2)' },
//   '100%': { opacity: 0, transform: 'scale(1)' },
// });

// const TypingDot = styled('div', {
//   width: '6px',
//   height: '6px',
//   background: '$colors$typingDot',
//   borderRadius: '6px',
//   opacity: 0,
//   animation: `${loadingFade} 1.5s infinite`,
// });

// const TypingDots = styled('div', {
//   width: '28px',
//   height: '20px',
//   display: 'flex',
//   gap: '$padding$0',
//   justifyContent: 'center',
//   alignItems: 'center',
//   position: 'relative',
// });

// renders a list of users who are
// typing at the moment
export function CurrentlyTyping(props: {
  profiles: { [userId: string]: Profile };
  userId: string;
  isTyping?: { [key: string]: boolean };
}) {
  const { profiles, isTyping, userId } = props;
  return isTyping ? (
    <>
      {Object.keys(isTyping).map((endUserId) =>
        // skip current user
        endUserId !== userId ? (
          isTyping?.[endUserId] === true ? (
            <TypingIndicator key={`typing-${endUserId}`} profile={profiles[endUserId]} />
          ) : null
        ) : null
      )}
    </>
  ) : null;
}

const StyledIsTypingText = styled('span', {
  color: '$colors$secondaryText',
});

function TypingIndicator(props: { profile: Profile }) {
  return (
    <StyledCommentContainer>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 32 }}>
        <StyledMessage>
          <StyledIsTypingText>
            <span>{props.profile.name || props.profile.email}</span> is typing...
          </StyledIsTypingText>
        </StyledMessage>
      </div>
    </StyledCommentContainer>
  );
}
