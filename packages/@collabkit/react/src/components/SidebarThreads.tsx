import { HideSidebarButtonTarget } from '@collabkit/core';
import React, { useLayoutEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { IconButton } from './IconButton';
import { Bell, ChatText, X } from './icons';
import * as styles from '../theme/components/Sidebar.css';
import { ThemeWrapper } from './ThemeWrapper';
import Composer from './composer/Composer';
import { useNewThreadId } from '../hooks/useNewThreadId';
import { Thread } from './Thread';
import Profile from './Profile';

function CloseSidebarButton() {
  const { store, events } = useApp();
  const userContext = useOptionalUserContext();

  return (
    <IconButton
      onPointerDown={(e) => {
        if (!userContext) {
          return null;
        }
        store.callbacks?.onInboxCloseButtonClick?.(userContext);

        const target: HideSidebarButtonTarget = {
          type: 'hideSidebarButton',
          workspaceId: userContext.workspaceId,
        };

        events.onPointerDown(e, { target });
      }}
    >
      <X size={16} />
    </IconButton>
  );
}
const SidebarContext = React.createContext<{ titleHeight: number }>({ titleHeight: 0 });

export function useOptionalSidebarContext() {
  return React.useContext(SidebarContext);
}

export function SidebarThreads(props: {
  title?: React.ReactNode;
  children: React.ReactNode;
  strategy?: 'fixed' | 'absolute';
}) {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const { store } = useApp();
  const { isSidebarOpen: isSidebarOpen } = useSnapshot(store);
  const newThreadId = useNewThreadId();
  const [inboxActive, setInboxActive] = useState(true);

  // set the title height so we can adjust the inbox scrollbar accordingly
  // we need to do this because the inbox scrollbar is a child of the inbox
  const [titleHeight, setTitleHeight] = React.useState(0);

  useLayoutEffect(() => {
    if (isSidebarOpen && titleRef.current) {
      setTitleHeight(titleRef.current.getBoundingClientRect().height);
    }
  }, [isSidebarOpen]);


  return isSidebarOpen ?
    <ThemeWrapper>
      <SidebarContext.Provider value={{ titleHeight }}>
        <div className={styles.root} style={{ position: props.strategy ?? 'fixed' }}>
          <span ref={titleRef} className={styles.title}>
            <div style={{ flex: 1 }}>{props.title ?? 'Comments'}</div>
            <div className={styles.iconButton({ active: inboxActive })} onClick={() => { setInboxActive(true) }}>
              <ChatText size={16} mirrored={true} />
            </div>
            <div className={styles.iconButton({ active: !inboxActive })} onClick={() => { setInboxActive(false) }}>
              <Bell size={16} />
            </div>
            <CloseSidebarButton />
          </span>
          <hr color='#EEEEEE' style={{ margin: 0 }} />
          {inboxActive ?
            <>
              <div style={{ display: 'contents' }}>{props.children}</div>
              <hr color='#EEEEEE' style={{marginTop : 0 }} />
              {store.userId && newThreadId ?
                <Thread.Provider threadId={newThreadId}>
                  <Profile.Provider profileId={store.userId}>
                    <Composer />
                  </Profile.Provider>
                </Thread.Provider>
                : null}
            </>
            :
            // TODO : notifs here
            null
          }

        </div>
      </SidebarContext.Provider>
    </ThemeWrapper>
    : null;
  ``;
}
