import React from 'react';
import { threadEmptyStateStyles } from '@collabkit/theme';
import { Chats } from '../icons';
import { styled } from '@stitches/react';
import { FlexCenter } from '../UIKit';

const EmptyStateContainer = styled('div', threadEmptyStateStyles.container);
const EmptyStateIcon = styled(Chats, threadEmptyStateStyles.icon);
const EmptyStateText = styled('span', threadEmptyStateStyles.text);

const emptyState = (
  <FlexCenter>
    <EmptyStateContainer>
      <EmptyStateIcon weight="regular" size={32} />
      <EmptyStateText>Write a comment</EmptyStateText>
    </EmptyStateContainer>
  </FlexCenter>
);

export function EmptyState() {
  return emptyState;
}
