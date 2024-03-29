import { useSidebarButton } from './public/useSidebarButton';
import { useUnreadThreadsCount } from './public/useUnreadThreadsCount';

export function useSidebarCommentsButton() {
  const unreadCount = useUnreadThreadsCount();
  const hasUnread = unreadCount > 0;
  const { onClick } = useSidebarButton();
  return {
    onClick,
    hasUnread,
    unreadCount,
  };
}
