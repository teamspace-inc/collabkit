import { memo } from 'react';
import React from 'react';
import Comment from './Comment';
import { CommentProps } from '../types';

export const MemoizedComment = memo(function MemoizedComment(props: CommentProps) {
  return (
    <Comment
      commentId={props.commentId}
      hideProfile={props.hideProfile}
      isFirstComment={props.isFirstComment}
    />
  );
});
