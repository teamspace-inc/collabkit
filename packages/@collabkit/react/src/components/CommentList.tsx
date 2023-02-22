import { ComponentProps } from 'react';
import React from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import { MemoizedComment } from './MemoizedComment';
import { useCommentList } from '../hooks/useCommentList';
import { COMMENT_MIN_HEIGHT } from '@collabkit/client';

export type CommentListProps = ComponentProps<'div'> & {
  renderComment?: (props: { commentId: string }) => React.ReactNode;
};

export function CommentList(props: CommentListProps) {
  const { children, ...otherProps } = props;
  const newIndicatorId = useNewIndicator();
  const commentList = useCommentList();

  const comments = commentList.map((comment) => {
    return (
      <div key={comment.id} style={{ minHeight: COMMENT_MIN_HEIGHT }}>
        {newIndicatorId === comment.id && <NewIndicator />}
        {props.renderComment ? (
          props.renderComment({ commentId: comment.id })
        ) : (
          <MemoizedComment commentId={comment.id} />
        )}
      </div>
    );
  });

  return (
    <div className={styles.root} {...otherProps}>
      {comments}
    </div>
  );
}
