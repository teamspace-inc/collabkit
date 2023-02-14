import { Thread, useUnreadCount } from '@collabkit/react';
import { useDocumentTitle } from './hooks/useDocumentTitle';

// function CustomAvatar(props: AvatarProps) {
//   return <Avatar user={props.profile} />;
// }

export function Home() {
  const threadId = 'new-your-thread-id2';

  const unreadCount = useUnreadCount({ threadId });
  const unread = unreadCount > 0 ? ` (${unreadCount})` : '';
  useDocumentTitle(`CollabKit Demo${unread}`);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Thread
        autoFocus={true}
        info={{ name: 'Demo thread' }}
        showHeader={true}
        threadId={threadId}
      />
    </div>
  );
}
