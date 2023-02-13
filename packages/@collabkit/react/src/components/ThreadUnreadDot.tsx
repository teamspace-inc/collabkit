import React from 'react';
import { useUnreadCommentsCount } from '../hooks/public/useUnreadCommentsCount';
import { useThreadContext } from '../hooks/useThreadContext';
import { unreadDot } from '../theme/components/InboxItem.css';

export function ThreadUnreadDot(props: React.ComponentPropsWithoutRef<'div'>) {
  const threadId = useThreadContext();
  const count = useUnreadCommentsCount({ threadId });
  return count > 0 ? <div className={unreadDot} {...props} /> : null;
}
