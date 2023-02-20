import React from 'react';
import { useSidebarButton } from '../hooks/public/useSidebarButton';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { inboxButton } from '../theme/components/InboxButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';

export function SidebarInboxButton(props: { children?: React.ReactNode; className?: string }) {
  const { onPointerDown } = useSidebarButton();
  const unreadThreadCount = useUnreadThreadsCount();
  const showUnreadDot = unreadThreadCount > 0;

  return (
    <ThemeWrapper>
      <button
        className={inboxButton}
        onPointerDown={onPointerDown}
        data-testid="collabkit-sidebar-inbox-button"
        {...props}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {showUnreadDot ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
            All comments
          </>
        )}
      </button>
    </ThemeWrapper>
  );
}
