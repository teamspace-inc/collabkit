import React from 'react';
import { useInboxButton } from '../hooks/public/useInboxButton';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { inboxButton } from '../styles/components/InboxButton.css';

// Cashboard icons
import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';

export function InboxButton() {
  const { onPointerDown } = useInboxButton();
  const unreadThreadCount = useUnreadThreadsCount();
  const showUnreadDot = unreadThreadCount > 0;

  return (
    <ThemeWrapper>
      {/* Cashboard specific styles */}
      <button
        className={inboxButton}
        // style={{
        //   fontSize: '14px',
        //   border: '1px solid #B4BDC2',
        //   borderRadius: '6px',
        //   fontWeight: 600,
        //   lineHeight: '160%',
        //   letterSpacing: -0.1,
        //   color: '#6A7278',
        //   background: 'transparent',
        //   padding: '8px 16px',
        //   boxSizing: 'border-box',
        //   height: 40,
        //   display: 'flex',
        //   gap: '8px',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   cursor: 'pointer',
        // }}
        onPointerDown={onPointerDown}
      >
        {showUnreadDot ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
        All comments
      </button>
    </ThemeWrapper>
  );
}
