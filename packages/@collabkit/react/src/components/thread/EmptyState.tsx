import React from 'react';
import { threadEmptyStateStyles } from '@collabkit/theme';
import { Chats } from '../icons';
import { styled } from '@stitches/react';
import { FlexCenter } from '../UIKit';

const Root = styled('div', threadEmptyStateStyles.root);
const Icon = styled(Chats, threadEmptyStateStyles.icon);
const Text = styled('span', threadEmptyStateStyles.text);

const emptyState = (
  <FlexCenter>
    <Root>
      <Icon weight="regular" size={32} />
      <Text>Write a comment</Text>
    </Root>
  </FlexCenter>
);

export function EmptyState() {
  return emptyState;
}
