import { Comment, Profile } from '@collabkit/react';

<Comment.Root commentId="comment123">
  <Profile.Avatar />
  <Comment.Header>
    <Comment.CreatorName />
    <Comment.Timestamp />
  </Comment.Header>
  <Comment.Actions>
    <Comment.ThreadResolveIconButton />
    <Comment.Menu />
  </Comment.Actions>
  <Comment.Body />
</Comment.Root>;
