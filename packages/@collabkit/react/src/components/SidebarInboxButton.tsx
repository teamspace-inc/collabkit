import React from 'react';
import { useInboxButton } from '../hooks/useInboxButton';
import { inboxButton } from '../theme/components/InboxButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';

export function SidebarInboxButton(props: { children?: React.ReactNode; className?: string }) {
  const { onClick, hasUnread } = useInboxButton();

  return (
    <ThemeWrapper>
      <button
        className={inboxButton}
        onClick={onClick}
        data-testid="collabkit-sidebar-inbox-button"
        {...props}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {hasUnread ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
            Comments
          </>
        )}
      </button>
    </ThemeWrapper>
  );
}
