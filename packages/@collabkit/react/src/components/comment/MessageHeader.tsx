import { styled } from '@stitches/react';
import { formatRelative } from 'date-fns';
import React from 'react';
import { Name } from '../profile/Name';

export const StyledMessageTimestamp = styled('span', {
  fontSize: '$fontSize$0',
  color: '$colors$secondaryText',
  textDecoration: 'none',
  fontWeight: '$fontWeights$0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const StyledMessage = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  flex: 0,
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  color: '$colors$primaryText',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  gap: '4px',
  borderRadius: '$radii$1',
});

export function MessageHeader(props: { name: string; createdAt: number }) {
  return (
    <Name>
      {props.name}{' '}
      <StyledMessageTimestamp>
        {formatRelative(props.createdAt, +Date.now())
          .replace(/yesterday at (.*)/, 'yesterday')
          .replace('today at', '')
          .replace(/(last Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) .*/, '$1')}
      </StyledMessageTimestamp>
    </Name>
  );
}
