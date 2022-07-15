import { formatRelative } from 'date-fns';
import React from 'react';
import { Name } from '../profile/Name';
import { StyledMessageTimestamp } from './Message';

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
