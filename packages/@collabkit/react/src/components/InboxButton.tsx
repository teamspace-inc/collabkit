import React from 'react';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { inboxButton } from '@collabkit/theme/components/InboxButton.css';

import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';
import { ThemeWrapper } from './ThemeWrapper';

export function InboxButton(props: { onClick: () => void; children?: React.ReactNode }) {
  const unreadThreadCount = useUnreadThreadsCount();
  const showUnreadDot = unreadThreadCount > 0;

  return (
    <ThemeWrapper>
      <button className={inboxButton} onClick={props.onClick}>
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
