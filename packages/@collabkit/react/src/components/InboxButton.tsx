import React from 'react';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import { Button } from './Button';

export function InboxButton() {
  const unreadThreadsCount = useUnreadThreadsCount();

  return (
    <Button
      type={'primary'}
      onPointerDown={function (e: React.PointerEvent<Element>): void {
        throw new Error('Function not implemented.');
      }}
      text={unreadThreadsCount > 0 ? `Inbox (${unreadThreadsCount})` : 'Inbox'}
    ></Button>
  );
}
