import { ComponentProps } from 'react';
import React from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import { MemoizedComment } from './MemoizedComment';
import { useCommentList } from '../hooks/useCommentList';

export type CommentListProps = ComponentProps<'div'> & {
  hideResolveButton?: boolean;
  shouldCollapse?: boolean;
};

function CommentList(props: CommentListProps) {
  const { shouldCollapse, hideResolveButton, children, ...otherProps } = props;
  const newIndicatorId = useNewIndicator();
  const commentList = useCommentList();

  const comments =
    props.children ||
    commentList.map((comment, i) => {
      return (shouldCollapse && i == 0) || !shouldCollapse ? (
        <div key={comment.id} style={{ minHeight: 34 }}>
          {newIndicatorId === comment.id && <NewIndicator />}
          {props.children ?? <MemoizedComment commentId={comment.id} />}
        </div>
      ) : null;
    });

  return (
    <div className={styles.root} {...otherProps}>
      {comments}
    </div>
  );
}

export { CommentList };
