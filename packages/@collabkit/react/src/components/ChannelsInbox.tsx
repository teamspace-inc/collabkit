import React from 'react';
import { Channels } from './Channels';
import { ThreadsInbox } from './ThreadsInbox';

export function ChannelsInbox() {
  return (
    <Channels>
      <ThreadsInbox maxHeight='93.5%' />
    </Channels>
  );
}
