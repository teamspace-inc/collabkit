import { Comment, Thread } from '@collabkit/react';

export default () => (
  <Thread.Provider threadId="thread1">
    <Comment commentId="comment123" />
  </Thread.Provider>
);
