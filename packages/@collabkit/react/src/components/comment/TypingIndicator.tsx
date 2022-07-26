import React from 'react';
import { styled } from '@stitches/react';
import { Profile } from '../../constants';
import { StyledCommentContainer } from '../Comment';
import { StyledMessage } from './MessageHeader';

// renders a list of users who are
// typing at the moment
export function CurrentlyTyping(props: {
  profiles: { [userId: string]: Profile };
  userId: string;
  isTyping?: { [userId: string]: boolean };
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
