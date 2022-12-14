import React, { ReactNode } from 'react';
import * as styles from '../styles/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment, { CommentProps } from './Comment';
import { useTimeline } from '../hooks/useTimeline';
import { groupedTimeline, computeIsResolved } from '@collabkit/core/src/timelineUtils';

const CommentListRoot = (props: React.ComponentProps<'div'>) => (
  <div className={styles.root} {...props} />
);

export default function CommentList(
  props: React.ComponentProps<'div'> & {
    renderComment?: (props: CommentProps) => ReactNode;
    hideResolveButton?: boolean;
  }
) {
  const { renderComment, hideResolveButton, ...rootProps } = props;
  const timeline = useTimeline();
  const isResolved = computeIsResolved(timeline);
  const { list } = groupedTimeline(timeline ?? {});
  const newIndicatorId = useNewIndicator();

  return (
    <CommentListRoot {...rootProps}>
      {list.map((group, groupIndex) => {
        const groupedComments: ReactNode[] = group.map((event, index) => {
          const commentProps = {
            commentId: event.id,
            hideProfile: index > 0,
            showResolveThreadButton:
              !hideResolveButton && !isResolved && groupIndex === 0 && index === 0,
          };

          const comment = renderComment ? (
            renderComment(commentProps)
          ) : (
            <Comment {...commentProps} />
          );
          return (
            <React.Fragment key={event.id}>
              {newIndicatorId === event.id && <NewIndicator />}
              {comment}
            </React.Fragment>
          );
        });

        return groupedComments.length > 0 ? (
          <div key={groupIndex} className={styles.group}>
            {groupedComments}
          </div>
        ) : null;
      })}
    </CommentListRoot>
  );
}

export { CommentListRoot as Root };
CommentList.Root = CommentListRoot;
