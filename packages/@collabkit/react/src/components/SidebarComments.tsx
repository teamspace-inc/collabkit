import React from 'react';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Authenticated } from './Authenticated';
import {
  ChannelFilters,
  ChannelNewThreadComposer,
  ChannelRoot,
  ChannelScrollableThreadList,
} from './Channel';
import { SidebarRoot, SidebarHeader, SidebarTitle, SidebarCloseButton } from './Sidebar';
import { useSidebarDefaultOpen } from '../hooks/useSidebarDefaultOpen';
import { ThemeWrapper } from './ThemeWrapper';
import { wrapper } from '../theme/components/SidebarComments.css';

function SidebarComments(props: React.ComponentPropsWithoutRef<'div'> & { defaultOpen?: boolean }) {
  const { defaultOpen, ...otherProps } = props;
  useSidebarDefaultOpen(props);
  return useIsSidebarOpen() ? (
    <div className={wrapper} {...otherProps}>
      <ThemeWrapper>
        <Authenticated>
          <SidebarRoot>
            <ChannelRoot channelId="default">
              <SidebarHeader>
                <SidebarTitle>Comments</SidebarTitle>
                <div style={{ flex: 1 }} />
                <SidebarCloseButton />
              </SidebarHeader>
              <ChannelFilters />
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
