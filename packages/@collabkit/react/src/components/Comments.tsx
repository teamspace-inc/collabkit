import React from 'react';
import { Authenticated } from './Authenticated';
import { ChannelRoot, ChannelScrollableThreadList, ChannelNewThreadComposer } from './Channel';

function Comments(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <Authenticated>
      <ChannelRoot channelId="default">
        <ChannelScrollableThreadList />
        <ChannelNewThreadComposer />
      </ChannelRoot>
    </Authenticated>
  );
}

export { Comments };
