import React from 'react';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Authenticated } from './Authenticated';
import { ChannelNewThreadComposer, ChannelRoot, ChannelScrollableThreadList } from './Channel';
import { SidebarRoot, SidebarHeader, SidebarTitle, SidebarCloseButton } from './Sidebar';
import { ThemeWrapper } from './ThemeWrapper';

function SidebarComments(props: React.ComponentPropsWithoutRef<'div'>) {
  return useIsSidebarOpen() ? (
    <div {...props}>
      <ThemeWrapper>
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
      </ThemeWrapper>
    </div>
  ) : null;
}

export { SidebarComments };
