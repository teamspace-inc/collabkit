import { Profile, Comment, Thread } from '@collabkit/react';

<Comment.Root commentId="comment123">
  <Profile.Avatar />
  <Comment.NameAndTimestampWrapper>
    <Comment.CreatorName />
    <Comment.Timestamp />
  </Comment.NameAndTimestampWrapper>
  <Comment.Actions>
    <Thread.ResolveIconButton />
    <Comment.MoreMenu />
  </Comment.Actions>
  <Comment.Body />
</Comment.Root>;
