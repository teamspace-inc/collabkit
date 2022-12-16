import React, { ReactNode } from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment, { CommentProps } from './Comment';
import { useTimeline } from '../hooks/useTimeline';
import { groupedTimeline, computeIsResolved } from '@collabkit/core/src/timelineUtils';
import { useSnapshot } from 'valtio';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useThreadContext } from '../hooks/useThreadContext';

const CommentListRoot = (props: React.ComponentProps<'div'>) => (
  <div className={styles.root} {...props} />
);

function useHasFetchedThreadTimeline() {
  const { threadId } = useThreadContext();
  const { fetchedProfiles, threadProfiles } = useSnapshot(useWorkspaceStore());

  // -1 to handle case where a new profile and comment are created at the same time
  const numFetchedProfiles = Object.keys(fetchedProfiles[threadId] ?? {}).length;
  const numThreadProfiles = Object.keys(threadProfiles[threadId] ?? {}).length;

  const hasFetched =
    numFetchedProfiles - 1 === numThreadProfiles || numFetchedProfiles === numThreadProfiles;

  return hasFetched;
}

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

  const hasFetched = useHasFetchedThreadTimeline();

  return hasFetched ? (
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
  ) : null;
}

export { CommentListRoot as Root };
CommentList.Root = CommentListRoot;
