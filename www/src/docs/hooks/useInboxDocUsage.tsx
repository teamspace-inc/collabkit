import { Comment, ThreadProvider, useComments, useInbox } from '@collabkit/react';

function InboxItem() {
  const comments = useComments();
  const firstComment = comments[0];
  const lastComment = comments[comments.length - 1];

  return (
    <div>
      {firstComment ? (
        <Comment.CommentRoot commentId={firstComment}>
          <Comment.CommentCreatorName />
          <Comment.CommentBody />
        </Comment.CommentRoot>
      ) : null}

      {lastComment ? (
        <Comment.CommentRoot commentId={lastComment}>
          <Comment.CommentCreatorName />
          <Comment.CommentBody />
        </Comment.CommentRoot>
      ) : null}
    </div>
  );
}

export function App() {
  const threadIds = useInbox({ filter: 'open' });
  return (
    <div>
      {threadIds.map((threadId) => (
        <ThreadProvider key={threadId} threadId={threadId}>
          <InboxItem />
        </ThreadProvider>
      ))}
    </div>
  );
}
