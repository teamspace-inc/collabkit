import React from 'react';
import { useThreadContext } from '../hooks/useThreadContext';
import { useUnreadCount } from '..';
import { unreadDot } from '../theme/components/ChannelsInboxItem.css';

export function ChannelUnreadDot(props: React.ComponentPropsWithoutRef<'div'>) {
  const { threadId } = useThreadContext();
  const count = useUnreadCount({ threadId });
  return count > 0 ? <div className={unreadDot} {...props} /> : null;
}
