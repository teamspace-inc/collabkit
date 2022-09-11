import { ShowInboxButtonTarget } from '@collabkit/core';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { useApp } from '../hooks/useApp';

// Cashboard icons
import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';

function useInboxButton() {
  const { store, events } = useApp();
  const { workspaceId } = useSnapshot(store);

  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (workspaceId) {
        const target: ShowInboxButtonTarget = {
          type: 'showInboxButton',
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
  const unreadThreadCount = useUnreadThreadsCount();
  const showUnreadDot = unreadThreadCount > 0;

  return (
    <div className={theme.className}>
      {/* Cashboard specific styles */}
      <button
        style={{
          fontSize: '14px',
          border: '1px solid #B4BDC2',
          borderRadius: '6px',
          fontWeight: 600,
          lineHeight: '160%',
          letterSpacing: -0.1,
          color: '#6A7278',
          background: 'transparent',
          padding: '8px 16px',
          boxSizing: 'border-box',
          height: 40,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onPointerDown={onPointerDown}
      >
        {showUnreadDot ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
        All comments
      </button>
    </div>
  );
}
