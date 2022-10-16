import { HideInboxButtonTarget } from '@collabkit/core';
import React, { useEffect, useLayoutEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { IconButton } from './IconButton';
import { X } from './icons';
import * as styles from '../styles/components/Sidebar.css';
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

        const target: HideInboxButtonTarget = {
          type: 'hideInboxButton',
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
  const { isInboxOpen } = useSnapshot(store);

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
          <h2 ref={titleRef} className={styles.title}>
            <div style={{ flex: 1 }}>{props.title ?? 'Comments'}</div>
            <CloseSidebarButton />
          </h2>
          <div style={{ display: 'contents' }}>{props.children}</div>
        </div>
      </SidebarContext.Provider>
    </ThemeWrapper>
  ) : null;
  ``;
}
