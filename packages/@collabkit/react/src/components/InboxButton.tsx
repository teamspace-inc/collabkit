import React from 'react';
import { toggleSidebarCommentsButton } from '../theme/components/ToggleSidebarCommentsButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';
import { useSidebarCommentsButton } from '../hooks/useSidebarCommentsButton';

export function InboxButton(props: { children?: React.ReactNode }) {
  const { onClick, hasUnread } = useSidebarCommentsButton();

  return (
    <ThemeWrapper>
      <button className={toggleSidebarCommentsButton} onClick={onClick}>
        {props.children ? (
          props.children
        ) : (
          <>
            {hasUnread ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
            All comments
          </>
        )}
      </button>
    </ThemeWrapper>
  );
}
