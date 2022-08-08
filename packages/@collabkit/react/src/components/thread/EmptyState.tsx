import { styled } from '@stitches/react';
import { Chat, Chats, Sparkle } from 'phosphor-react';
import React from 'react';
import { useApp } from '../../hooks/useApp';
import { FlexCenter } from '../UIKit';

const NullState = styled('div', {
  fontWeight: '400',
  fontSize: '$fontSize$1',
  color: '$neutral10',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '$padding$1',
});

export function EmptyState() {
  const { theme } = useApp();

  return (
    <FlexCenter>
      <NullState>
        <Chats weight="regular" size={32} color={theme.colors.neutral9.toString()} />
        <span style={{ fontWeight: '500' }}>Write a comment</span>
      </NullState>
    </FlexCenter>
  );
}
