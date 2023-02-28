import React from 'react';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Authenticated } from './Authenticated';
import { ChannelNewThreadComposer, ChannelRoot, ChannelThreadList } from './Channel';
import { Scrollable } from './Scrollable';
import { SidebarRoot, SidebarHeader, SidebarTitle, SidebarCloseButton } from './Sidebar';
import { ThemeWrapper } from './ThemeWrapper';

function SidebarComments(props: React.ComponentPropsWithoutRef<'div'>) {
  return useIsSidebarOpen() ? (
    <div {...props}>
      <ThemeWrapper>
        <Authenticated>
          <SidebarRoot>
            <ChannelRoot channelId="default" style={{ height: '100%' }}>
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
      </ThemeWrapper>
    </div>
  ) : null;
}

export { SidebarComments };
