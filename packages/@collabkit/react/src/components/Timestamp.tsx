import { formatTimestamp } from '@collabkit/core';
import { formatISO } from 'date-fns';
import React from 'react';

export function Timestamp(props: {
  timestamp: number;
  className?: string;
  style?: React.CSSProperties;
  format?: (timestamp: number, now: number) => string;
}) {
  const { timestamp } = props;
  const formattedTimestamp = props.format
    ? props.format(timestamp, Date.now())
    : formatTimestamp(timestamp, Date.now());
  return (
    <time className={props.className} style={props.style} dateTime={formatISO(timestamp)}>
      {formattedTimestamp}
    </time>
  );
}
