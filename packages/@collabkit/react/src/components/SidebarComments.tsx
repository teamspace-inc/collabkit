import { actions } from '@collabkit/client';
import React, { useEffect } from 'react';
import { useStore } from '../hooks';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Authenticated } from './Authenticated';
import { ChannelNewThreadComposer, ChannelRoot, ChannelScrollableThreadList } from './Channel';
import { SidebarRoot, SidebarHeader, SidebarTitle, SidebarCloseButton } from './Sidebar';
import { ThemeWrapper } from './ThemeWrapper';

function SidebarComments(props: React.ComponentPropsWithoutRef<'div'> & { defaultOpen?: boolean }) {
  const { defaultOpen, ...otherProps } = props;
  const store = useStore();
  useEffect(() => {
    if (props.defaultOpen) {
      actions.showSidebar(store);
    }
  }, [store, props.defaultOpen]);

  return useIsSidebarOpen() ? (
    <div {...otherProps}>
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
