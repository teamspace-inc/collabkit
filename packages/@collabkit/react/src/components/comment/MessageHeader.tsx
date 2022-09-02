import { styled } from '@stitches/react';
import { formatRelative } from 'date-fns';
import React from 'react';
import { messageHeaderStyles } from '@collabkit/theme';

const Name = styled('div', messageHeaderStyles.name);
const StyledMessageTimestamp = styled('span', messageHeaderStyles.timestamp);
const StyledMessageHeaderContainer = styled('div', messageHeaderStyles.container);

export function MessageHeader(props: {
  name: string;
  createdAt?: number;
  layout?: 'inline' | 'block';
}) {
  return (
    <StyledMessageHeaderContainer layout={props.layout ?? 'inline'}>
      <Name>{props.name}</Name>
      {props.createdAt ? (
        <StyledMessageTimestamp>
          {formatRelative(props.createdAt, +Date.now())
            .replace(/yesterday at (.*)/, 'yesterday')
            .replace('today at', '')
            .replace(/(last Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) .*/, '$1')}
        </StyledMessageTimestamp>
      ) : null}
    </StyledMessageHeaderContainer>
  );
}
