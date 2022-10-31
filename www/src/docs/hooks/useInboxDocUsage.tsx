import { Comment, Thread, useComments, useInbox } from '@collabkit/react';

function InboxItem() {
  const comments = useComments();
  const firstComment = comments[0];
  const lastComment = comments[comments.length - 1];

  return (
    <div>
      {firstComment ? (
        <Comment.Root commentId={firstComment}>
          <Comment.CreatorName />
          <Comment.Body />
        </Comment.Root>
      ) : null}

      {lastComment ? (
        <Comment.Root commentId={lastComment}>
          <Comment.CreatorName />
          <Comment.Body />
        </Comment.Root>
      ) : null}
    </div>
  );
}

export function App() {
  const threadIds = useInbox({ filter: 'open' });
  return (
    <div>
      {threadIds.map((threadId) => (
        <Thread.Provider key={threadId} threadId={threadId}>
          <InboxItem />
        </Thread.Provider>
      ))}
    </div>
  );
}
