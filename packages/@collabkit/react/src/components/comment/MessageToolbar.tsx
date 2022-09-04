import React from 'react';
import { styled } from '@stitches/react';
import { messageToolbarStyles } from '@collabkit/theme';
import { ReactionButton } from './ReactionButton';

const Root = styled('div', messageToolbarStyles.root);

export function MessageToolbar(props: { isVisible: boolean }) {
  return (
    <Root isVisible={props.isVisible}>
      <ReactionButton />
    </Root>
  );
}
