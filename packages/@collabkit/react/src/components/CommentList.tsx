import React from 'react';
import * as styles from '../styles/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment from './Comment';
import { useTimeline } from '../hooks/useTimeline';
import { groupedTimeline } from '@collabkit/core/src/timelineUtils';

const CommentListRoot = (props: React.ComponentProps<'div'>) => (
  <div className={styles.root} {...props} />
);

export { CommentListRoot as Root };

export default function CommentList(props: React.ComponentProps<'div'>) {
  const timeline = useTimeline();
  const { list } = groupedTimeline(timeline ?? {});
  const newIndicatorId = useNewIndicator();

  return (
    <CommentListRoot {...props}>
      {list?.map((group, gi) => {
        const groupedComments = group.map((event, index) => {
          // todo put this in context?!
          const showProfile = index === 0;
          return (
            <React.Fragment key={event.id}>
              {newIndicatorId === event.id ? <NewIndicator /> : null}
              <Comment
                commentId={event.id}
                hideProfile={!showProfile}
                showResolveThreadButton={gi === 0 && index === 0}
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
