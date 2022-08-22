import React from 'react';
import { styled } from '@stitches/react';
import { messageToolbarStyles } from '@collabkit/theme';
import { ReactionButton } from './ReactionButton';

const StyledMessageToolbar = styled('div', messageToolbarStyles.toolbar);

export function MessageToolbar(props: { isVisible: boolean }) {
  return (
    <StyledMessageToolbar isVisible={props.isVisible}>
      <ReactionButton />
    </StyledMessageToolbar>
  );
}
