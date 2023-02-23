import React from 'react';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Authenticated } from './Authenticated';
import { ChannelNewThreadComposer, ChannelRoot, ChannelThreadList } from './Channel';
import { Root } from './Root';
import { Scrollable } from './Scrollable';
import { SidebarRoot, SidebarHeader, SidebarTitle, SidebarCloseButton } from './Sidebar';

function SidebarComments() {
  return useIsSidebarOpen() ? (
    <Root>
      <Authenticated>
        <SidebarRoot>
          <ChannelRoot channelId="default" style={{ height: '100vh' }}>
            <SidebarHeader>
              <SidebarTitle>Comments</SidebarTitle>
              <div style={{ flex: 1 }} />
              <SidebarCloseButton />
            </SidebarHeader>
            <Scrollable autoScroll="bottom" alignToBottom={true}>
              <ChannelThreadList />
            </Scrollable>
            <ChannelNewThreadComposer />
          </ChannelRoot>
        </SidebarRoot>
      </Authenticated>
    </Root>
  ) : null;
}

export { SidebarComments };
