import { Profile, Comment, Thread } from '@collabkit/react';

<Comment.Root commentId="comment123">
  <Profile.Avatar />
  <Comment.Header>
    <Comment.CreatorName />
    <Comment.Timestamp />
  </Comment.Header>
  <Comment.Actions>
    <Thread.ResolveIconButton />
    <Comment.Menu />
  </Comment.Actions>
  <Comment.Body />
</Comment.Root>;
