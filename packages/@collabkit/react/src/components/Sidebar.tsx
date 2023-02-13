import { HideSidebarButtonTarget } from '@collabkit/core';
import React, { useLayoutEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useOptionalUserContext';
import { IconButton } from './IconButton';
import { Bell, ChatText, X } from './icons';
import * as styles from '../theme/components/Sidebar.css';
import { ThemeWrapper } from './ThemeWrapper';
import { useOptionalWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useStore } from '../hooks/useStore';
import { SidebarContext } from './useOptionalSidebarContext';

function CloseSidebarButton() {
  const { store, events } = useApp();
  const userId = useOptionalUserContext();
  const workspaceId = useOptionalWorkspaceContext();

  return (
    <IconButton
      onPointerDown={(e) => {
        if (!userId) {
          return null;
        }
        if (!workspaceId) {
          return null;
        }
        store.callbacks?.onInboxCloseButtonClick?.({ userId, workspaceId });

        const target: HideSidebarButtonTarget = {
          type: 'hideSidebarButton',
          workspaceId,
        };

        events.onPointerDown(e, { target });
      }}
    >
      <X size={16} />
    </IconButton>
  );
}
function Sidebar(props: {
  title?: React.ReactNode;
  children: React.ReactNode;
  strategy?: 'fixed' | 'absolute';
}) {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const store = useStore();
  const { isSidebarOpen: isSidebarOpen } = useSnapshot(store);
  const [inboxActive, setInboxActive] = useState(true);

  // set the title height so we can adjust the inbox scrollbar accordingly
  // we need to do this because the inbox scrollbar is a child of the inbox
  const [titleHeight, setTitleHeight] = React.useState(0);

  useLayoutEffect(() => {
    if (isSidebarOpen && titleRef.current) {
      setTitleHeight(titleRef.current.getBoundingClientRect().height);
    }
  }, [isSidebarOpen]);

  const header = (
    <div ref={titleRef} className={styles.title}>
      <div style={{ flex: 1 }} data-testid="sidebar-title">
        {props.title ?? 'Comments'}
      </div>
      {/* Hidden till we have notifictions ready */}
      <div
        className={styles.iconButton({ active: inboxActive })}
        // onClick={() => { setInboxActive(true) }}
      >
        <ChatText size={16} mirrored={true} />
      </div>
      <div
        className={styles.iconButton({ active: !inboxActive })}
        // onClick={() => { setInboxActive(false) }}
      >
        <Bell size={16} />
      </div>
      <CloseSidebarButton />
    </div>
  );

  return isSidebarOpen ? (
    <ThemeWrapper>
      <SidebarContext.Provider value={{ titleHeight }}>
        <div className={styles.root} style={{ position: props.strategy ?? 'fixed' }}>
          {header}
          {inboxActive ? (
            <div style={{ display: 'contents' }}>{props.children}</div>
          ) : // TODO : notifs here
          null}
        </div>
      </SidebarContext.Provider>
    </ThemeWrapper>
  ) : null;
  ``;
}

export { Sidebar };
