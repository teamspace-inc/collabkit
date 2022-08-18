import React from 'react';
import { styled } from '@stitches/react';
import { typingIndicatorStyles } from '@collabkit/theme';
import { Profile } from '../../constants';
import { StyledCommentContainer, StyledCommentMessage } from './StyledComment';
import { HStack } from '../UIKit';

const StyledIsTypingText = styled('span', typingIndicatorStyles.typingText);

export function TypingIndicator(props: { profile: Profile }) {
  return (
    <StyledCommentContainer>
      <HStack>
        <StyledCommentMessage profileIndent>
          <StyledIsTypingText>
            <span>{props.profile.name || props.profile.email}</span> is typing...
          </StyledIsTypingText>
        </StyledCommentMessage>
      </HStack>
    </StyledCommentContainer>
  );
}
