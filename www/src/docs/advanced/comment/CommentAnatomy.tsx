import { Profile, Comment, Thread } from '@collabkit/react';

<Comment.Root commentId="comment123">
  <Comment.Content>
    <Comment.Header>
      <Profile.Avatar />
      <Comment.NameAndTimestampWrapper>
        <Comment.CreatorName />
        <Comment.Timestamp />
      </Comment.NameAndTimestampWrapper>
      <Comment.Actions>
        <Thread.ResolveIconButton />
        <Comment.MoreMenu />
      </Comment.Actions>
    </Comment.Header>
    <Comment.Indent>
      <Comment.Body />
    </Comment.Indent>
  </Comment.Content>
</Comment.Root>;