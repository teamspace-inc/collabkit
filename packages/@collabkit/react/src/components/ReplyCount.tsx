import React from 'react';
import { useReplyCount } from '../hooks/useReplyCount';

export function ReplyCount(props: React.ComponentPropsWithoutRef<'button'>) {
  const replyCount = useReplyCount();
  if (replyCount === 0) {
    return <span {...props}>Reply</span>;
  } else {
    return (
      <span {...props}>
        {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
      </span>
    );
  }
}
