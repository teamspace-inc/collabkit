import React from 'react';
import { Comment, CommentProps, Profile, Thread } from '@collabkit/react';

export function CashboardComment({
  hideProfile,
  showResolveThreadButton,
  commentId,
}: CommentProps) {
  return (
    <Comment.Root commentId={commentId}>
      <div className="flex gap-3 relative">
        {!hideProfile && <Profile.Avatar />}
        {!hideProfile && (
          <div className="flex flex-col">
            <Comment.CreatorName />
            <Comment.Timestamp />
          </div>
        )}
        <Comment.Actions>
          {showResolveThreadButton && <Thread.ResolveIconButton />}
          <Comment.MoreMenu />
        </Comment.Actions>
      </div>
      <Comment.Body />
      <Comment.Editor className="flex flex-col gap-3" />
    </Comment.Root>
  );
}
