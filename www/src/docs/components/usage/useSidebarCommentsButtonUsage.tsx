import { useSidebarCommentsButton } from '@collabkit/react';

export function SidebarCommentsButton() {
  const { onClick, hasUnread, unreadCount } = useSidebarCommentsButton();

  // use to show a badge and/or unread count
  console.log('hasUnread', hasUnread);
  console.log('unreadCount', unreadCount);

  return (
    <div>
      <button onClick={onClick}>Comments</button>
    </div>
  );
}
