import React from 'react';
import { useReplyCount } from './useReplyCount';

export function ReplyCount(props: React.ComponentPropsWithoutRef<'button'>) {
  const replyCount = useReplyCount();
  return (
    <span {...props}>
      {replyCount === 0 ? 'No' : replyCount} {replyCount === 1 ? 'reply' : 'replies'}
    </span>
  );
}
