import React from 'react';
import * as styles from '../styles/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment from './Comment';
import { useTimeline } from '../hooks/useTimeline';
import { groupedTimeline, computeIsResolved } from '@collabkit/core/src/timelineUtils';
import { useThreadContext } from '../hooks/useThreadContext';

const CommentListRoot = (props: React.ComponentProps<'div'>) => (
  <div className={styles.root} {...props} />
);

export { CommentListRoot as Root };

export default function CommentList(props: React.ComponentProps<'div'>) {
  const { userId } = useThreadContext();
  const timeline = useTimeline();

  // todo @nc: tidy this up a bit
  const isResolved = computeIsResolved(timeline);
  const firstCommentId = timeline ? Object.keys(timeline)[0] : null;
  const canResolve = firstCommentId ? timeline[firstCommentId].createdById === userId : false;
  canResolve;

  const { list } = groupedTimeline(timeline ?? {});
  const newIndicatorId = useNewIndicator();

  return (
    <CommentListRoot {...props}>
      {props.children ??
        list?.map((group, gi) => {
          const groupedComments = group.map((event, index) => {
            // todo put this in context?!
            const showProfile = index === 0;
            return (
              <React.Fragment key={event.id}>
                {newIndicatorId === event.id ? <NewIndicator /> : null}
                <Comment
                  commentId={event.id}
                  hideProfile={!showProfile}
                  showResolveThreadButton={canResolve && !isResolved && gi === 0 && index === 0}
                />
              </React.Fragment>
            );
          });
          // only add a div if the group has comments in it
          return groupedComments ? <div key={gi}>{groupedComments}</div> : null;
        })}
    </CommentListRoot>
  );
}

CommentList.Root = CommentListRoot;
