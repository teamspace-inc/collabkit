import { styled } from '@stitches/react';
import { Lightbulb } from 'phosphor-react';
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
  // todo make this dynamic
  // marginBottom: '40px', // composer height
  gap: '$padding$1',
});

export function EmptyState() {
  const { theme } = useApp();

  return (
    <FlexCenter>
      <NullState>
        <Lightbulb weight="regular" size={32} color={theme.colors.neutral8.toString()} />
        Leave a comment
      </NullState>
    </FlexCenter>
  );
}
