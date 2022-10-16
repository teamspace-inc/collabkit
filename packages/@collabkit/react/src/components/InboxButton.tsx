import React from 'react';
import { useInboxButton } from '../hooks/public/useInboxButton';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { inboxButton } from '../styles/components/InboxButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';

export function InboxButton(props: { onClick?: () => void }) {
  const { onPointerDown } = useInboxButton(props);
  const unreadThreadCount = useUnreadThreadsCount();
  const showUnreadDot = unreadThreadCount > 0;

  return (
    <ThemeWrapper>
      <button className={inboxButton} onPointerDown={onPointerDown}>
        {showUnreadDot ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
        All comments
      </button>
    </ThemeWrapper>
  );
}
