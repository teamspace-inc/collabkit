import { styled } from '@stitches/react';
import { formatRelative } from 'date-fns';
import React from 'react';
import { messageHeaderStyles } from '@collabkit/theme';

export const Name = styled('div', messageHeaderStyles.name);
export const StyledMessageTimestamp = styled('span', messageHeaderStyles.timestamp);
export const StyledMessage = styled('div', messageHeaderStyles.message);

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
