import React from 'react';
import { useSidebarCommentsButton } from '../hooks/useSidebarCommentsButton';
import { toggleSidebarCommentsButton } from '../theme/components/ToggleSidebarCommentsButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';

export function ToggleSidebarCommentsButton(props: React.ComponentPropsWithoutRef<'button'>) {
  const { onClick, hasUnread } = useSidebarCommentsButton();

  return (
    <ThemeWrapper>
      <button
        className={toggleSidebarCommentsButton}
        {...props}
        data-testid="collabkit-sidebar-comments-toggle-button"
        onClick={onClick}
      >
        {props.children ?? (
          <>
            {hasUnread ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
            Comments
          </>
        )}
      </button>
    </ThemeWrapper>
  );
}
