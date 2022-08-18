import { styled } from '@stitches/react';

export const HStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const VStack = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const FlexCenter = styled('div', {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});
