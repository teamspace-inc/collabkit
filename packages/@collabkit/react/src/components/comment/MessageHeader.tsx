import { formatRelative } from 'date-fns';
import React from 'react';
import { Name } from '../profile/Name';
import { styled } from '../UIKit';

export const StyledMessageTimestamp = styled('span', {
  fontSize: '$fontSize$0',
  letterSpacing: '-0.015em',
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
          .replace('yesterday at', 'yesterday')
          .replace('today at', '')}
      </StyledMessageTimestamp>
    </Name>
  );
}
