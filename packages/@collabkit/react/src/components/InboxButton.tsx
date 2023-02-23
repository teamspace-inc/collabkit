import React from 'react';
import { inboxButton } from '../theme/components/InboxButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';
import { useInboxButton } from '../hooks/useInboxButton';

export function InboxButton(props: { onClick: () => void; children?: React.ReactNode }) {
  const { onClick, hasUnread } = useInboxButton();

  return (
    <ThemeWrapper>
      <button className={inboxButton} onClick={onClick}>
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
