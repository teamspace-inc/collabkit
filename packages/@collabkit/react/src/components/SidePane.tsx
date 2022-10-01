import { HideInboxButtonTarget } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { IconButton } from './IconButton';
import { X } from './icons';
import * as styles from '../styles/SidePane.css';

function CloseSidePaneButton() {
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
      <X />
    </IconButton>
  );
}

export function SidePane(props: { children: React.ReactNode }) {
  const { store } = useApp();
  const { isInboxOpen } = useSnapshot(store);

  return isInboxOpen ? (
    <div className={styles.root}>
      <h2 className={styles.title}>
        <div style={{ flex: 1 }}>All Comments</div>
        <CloseSidePaneButton />
      </h2>
      <div style={{ flex: 1, height: 'calc(100% - 77px)' }}>{props.children}</div>
    </div>
  ) : null;
}
