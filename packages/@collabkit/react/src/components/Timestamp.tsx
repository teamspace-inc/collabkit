import React from 'react';
import { formatRelative } from 'date-fns';

export function Timestamp(props: {
  timestamp: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={props.className} style={props.style}>
      {formatRelative(props.timestamp, +Date.now())
        .replace(/yesterday at (.*)/, 'yesterday')
        .replace('today at', '')
        .replace(/(last Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) .*/, '$1')}
    </span>
  );
}
