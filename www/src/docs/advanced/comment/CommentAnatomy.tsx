import {
  CommentThreadResolveIconButton,
  CommentActions,
  CommentBody,
  CommentCreatorName,
  CommentHeader,
  CommentMenu,
  CommentRoot,
  CommentTimestamp,
  ProfileAvatar,
} from '@collabkit/react';

<CommentRoot commentId="comment123">
  <ProfileAvatar />
  <CommentHeader>
    <CommentCreatorName />
    <CommentTimestamp />
  </CommentHeader>
  <CommentActions>
    <CommentThreadResolveIconButton />
    <CommentMenu />
  </CommentActions>
  <CommentBody />
</CommentRoot>;
