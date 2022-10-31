import {
  useInbox,
  Comment,
  Profile,
  ThreadProvider,
  useComments,
  useIsResolved,
  useUnreadCount,
  useResolveThread,
  ThreadFacepile,
  useThreadUsers,
  useReplyCount,
} from '@collabkit/react';

function CustomInboxItem(props: { threadId: string }) {
  const commentIds = useComments();
  const firstCommentId = commentIds[0];
  const lastCommentId = commentIds[commentIds.length - 1];
  const isResolved = useIsResolved();
  const unreadCount = useUnreadCount(props);
  const resolveThread = useResolveThread();
  const users = useThreadUsers();
  const replyCount = useReplyCount();

  return (
    <>
      {/* render facepile here */}
      <ThreadFacepile />
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      {unreadCount > 0 ? 'Unread' : 'Read'} {isResolved ? 'Resolved' : 'Open'}
      {!isResolved ? <button onClick={resolveThread}>Resolve</button> : null}
      {firstCommentId ? (
        <Comment.Root commentId={firstCommentId}>
          <Profile.Name />
          <Comment.Timestamp />
          <Comment.Body />
        </Comment.Root>
      ) : null}
      {lastCommentId ? (
        <Comment.Root commentId={lastCommentId}>
          <Comment.Timestamp />
        </Comment.Root>
      ) : null}
      {replyCount > 0 ? <div>{replyCount} replies</div> : null}
    </>
  );
}

export function CustomInbox() {
  const threadIds = useInbox({ filter: 'open' });

  return (
    <div>
      <h1>Custom inbox</h1>

      {threadIds.map((threadId) => (
        <ThreadProvider key={threadId} threadId={threadId}>
          <CustomInboxItem threadId={threadId} />
        </ThreadProvider>
      ))}
    </div>
  );
}
