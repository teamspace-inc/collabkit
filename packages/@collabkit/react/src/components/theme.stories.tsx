import React from 'react';
import { styled } from '@stitches/react';
import { useApp } from '../hooks/useApp';
import { tomato } from '@radix-ui/colors';

const Heading = styled('h2', {
  color: '$colors$neutral12',
  marginBottom: 40,
});

const Palette = styled('div', {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap',
});

const Color = styled('div', {
  width: 50,
  height: 50,
  borderRadius: '50%',
});

export const Sheet = () => {
  const { theme } = useApp();
  return (
    <div className={theme.className}>
      <Heading>Colors</Heading>
      <Palette>
        <Color css={{ background: '$colors$neutral1' }} />
        <Color css={{ background: '$colors$neutral2' }} />
        <Color css={{ background: '$colors$neutral3' }} />
        <Color css={{ background: '$colors$neutral4' }} />
        <Color css={{ background: '$colors$neutral5' }} />
        <Color css={{ background: '$colors$neutral6' }} />
        <Color css={{ background: '$colors$neutral7' }} />
        <Color css={{ background: '$colors$neutral8' }} />
        <Color css={{ background: '$colors$neutral9' }} />
        <Color css={{ background: '$colors$neutral10' }} />
        <Color css={{ background: '$colors$neutral11' }} />
        <Color css={{ background: '$colors$neutral12' }} />
      </Palette>
    </div>
  );
};
