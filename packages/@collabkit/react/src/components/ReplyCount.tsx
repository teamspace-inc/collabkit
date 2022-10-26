import React from 'react';
import { useReplyCount } from '../hooks/useReplyCount';
import * as styles from '../styles/components/InboxItem.css';

export function ReplyCount(props: React.ComponentPropsWithoutRef<'button'>) {
  const replyCount = useReplyCount();
  return (
    <span className={styles.replyCount} {...props}>
      {replyCount === 0 ? 'No' : replyCount} {replyCount === 1 ? 'reply' : 'replies'}
    </span>
  );
}
