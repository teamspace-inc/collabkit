import { HideSidebarButtonTarget } from '@collabkit/core';
import React, { useLayoutEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { IconButton } from './IconButton';
import { X } from './icons';
import * as styles from '@collabkit/theme/components/Sidebar.css';
import { ThemeWrapper } from './ThemeWrapper';

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
      <X weight={'bold'} />
    </IconButton>
  );
}
const SidebarContext = React.createContext<{ titleHeight: number }>({ titleHeight: 0 });

export function useOptionalSidebarContext() {
  return React.useContext(SidebarContext);
}

export function Sidebar(props: {
  title?: React.ReactNode;
  children: React.ReactNode;
  strategy?: 'fixed' | 'absolute';
}) {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const { store } = useApp();
  const { isSidebarOpen: isInboxOpen } = useSnapshot(store);

  // set the title height so we can adjust the inbox scrollbar accordingly
  // we need to do this because the inbox scrollbar is a child of the inbox
  const [titleHeight, setTitleHeight] = React.useState(0);

  useLayoutEffect(() => {
    if (isInboxOpen && titleRef.current) {
      setTitleHeight(titleRef.current.getBoundingClientRect().height);
    }
  }, [isInboxOpen]);

  return isInboxOpen ? (
    <ThemeWrapper>
      <SidebarContext.Provider value={{ titleHeight }}>
        <div className={styles.root} style={{ position: props.strategy ?? 'fixed' }}>
          <span ref={titleRef} className={styles.title}>
            <div style={{ flex: 1 }}>{props.title ?? 'Comments'}</div>
            <CloseSidebarButton />
          </span>
          <div style={{ display: 'contents' }}>{props.children}</div>
        </div>
      </SidebarContext.Provider>
    </ThemeWrapper>
  ) : null;
  ``;
}
