import { InboxButtonTarget } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { useApp } from '../hooks/useApp';
import { Button } from './Button';

export function useInboxButton() {
  const { store, events } = useApp();
  const { workspaceId } = useSnapshot(store);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId) {
        const target: InboxButtonTarget = {
          type: 'inboxButton',
          workspaceId,
        };
        events.onPointerDown(e, { target });
      } else {
        console.error('[CollabKit] Workspace ID not found');
      }
    },
  };
}

export function InboxButton() {
  const { theme } = useApp();
  const { onPointerDown } = useInboxButton();
  const unreadThreadsCount = useUnreadThreadsCount();

  return (
    <div className={theme.className}>
      <Button
        type={'primary'}
        onPointerDown={onPointerDown}
        text={unreadThreadsCount > 0 ? `Inbox (${unreadThreadsCount})` : 'Inbox'}
      ></Button>
    </div>
  );
}
