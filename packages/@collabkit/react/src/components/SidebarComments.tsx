import React from 'react';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Authenticated } from './Authenticated';
import { ChannelNewThreadComposer, ChannelRoot, ChannelScrollableThreadList } from './Channel';
import { SidebarRoot, SidebarHeader, SidebarTitle, SidebarCloseButton } from './Sidebar';
import { useSidebarDefaultOpen } from '../hooks/useSidebarDefaultOpen';

function SidebarComments(props: React.ComponentPropsWithoutRef<'div'> & { defaultOpen?: any }) {
  const { defaultOpen, ...otherProps } = props;
  useSidebarDefaultOpen(props);
  return useIsSidebarOpen() ? (
    <div {...otherProps}>
      <Authenticated>
        <SidebarRoot>
          <ChannelRoot channelId="default">
            <SidebarHeader>
              <SidebarTitle>Comments</SidebarTitle>
              <div style={{ flex: 1 }} />
              <SidebarCloseButton />
            </SidebarHeader>
            <ChannelScrollableThreadList />
            <ChannelNewThreadComposer />
          </ChannelRoot>
        </SidebarRoot>
      </Authenticated>
    </div>
  ) : null;
}

export { SidebarComments };
