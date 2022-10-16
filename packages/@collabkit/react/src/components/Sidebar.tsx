import { HideInboxButtonTarget } from '@collabkit/core';
import React from 'react';
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

export function Sidebar(props: {
  title?: React.ReactNode;
  children: React.ReactNode;
  strategy?: 'fixed' | 'absolute';
}) {
  const { store } = useApp();
  const { isInboxOpen } = useSnapshot(store);

  return isInboxOpen ? (
    <ThemeWrapper>
      <div className={styles.root} style={{ position: props.strategy ?? 'fixed' }}>
        <h2 className={styles.title}>
          <div style={{ flex: 1 }}>{props.title ?? 'Comments'}</div>
          <CloseSidebarButton />
        </h2>
        <div className={styles.scrollarea}>{props.children}</div>
      </div>
    </ThemeWrapper>
  ) : null;
  ``;
}
