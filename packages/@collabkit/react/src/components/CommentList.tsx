import { ComponentProps, ReactNode, useEffect, useState } from 'react';
import React, { Fragment } from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment, { CommentProps } from './Comment';
import { useTimeline } from '../hooks/useTimeline';
import { groupedTimeline, computeIsResolved } from '@collabkit/core/src/timelineUtils';
import { useSnapshot } from 'valtio';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useThreadContext } from '../hooks/useThreadContext';
import { useApp } from '../hooks/useApp';
import { useOptionalChannelContext } from '../hooks/useChannelContext';

function useHasFetchedThreadTimeline() {
  const { threadId } = useThreadContext();
  const { store } = useApp();
  const { config } = useSnapshot(store);
  const { fetchedProfiles, threadProfiles } = useSnapshot(useWorkspaceStore());
  const [hasFetched, setHasFetched] = useState(false);

  const numFetchedProfiles = Object.keys(fetchedProfiles[threadId] ?? {}).length;
  const numThreadProfiles = Object.keys(threadProfiles[threadId] ?? {}).length;
  useEffect(() => {
    if (config.mentionableUsers !== 'allWorkspace') {
      // -1 to handle case where a new profile and comment are created at the same time
      // TODO: make this simpler
      setHasFetched(
        numFetchedProfiles - 1 === numThreadProfiles || numFetchedProfiles === numThreadProfiles
      );
    }
  }, [config.mentionableUsers, numFetchedProfiles, numThreadProfiles]);

  return config.mentionableUsers === 'allWorkspace' || hasFetched;
}

export default function CommentList(
  props: ComponentProps<'div'> & {
    hideResolveButton?: boolean;
    isCollapsed?: boolean;
  }
) {
  const { isCollapsed, hideResolveButton, ...otherProps } = props;
  const timeline = useTimeline();
  const isResolved = computeIsResolved(timeline);
  const { list } = groupedTimeline(timeline ?? {});
  const newIndicatorId = useNewIndicator();
  const isChannel = !!useOptionalChannelContext();
  const hasFetched = useHasFetchedThreadTimeline();
  const { expandedThreadIds } = useSnapshot(useApp().store);
  const { threadId } = useThreadContext();
  const isExpanded = !!expandedThreadIds.find((id) => id === threadId);

  return hasFetched ? (
    <div className={styles.root} {...otherProps}>
      {list.map((group, groupIndex) => {
        const groupedComments: ReactNode[] = group.map((event, index) => {
          const commentProps: CommentProps = {
            commentId: event.id,
            hideProfile: index > 0,
            isFirstComment: !hideResolveButton && !isResolved && groupIndex === 0 && index === 0,
          };

          return !isChannel || !isCollapsed || commentProps.isFirstComment || isExpanded ? (
            <Fragment key={event.id}>
              {newIndicatorId === event.id && <NewIndicator />}
              <Comment {...commentProps} />
            </Fragment>
          ) : null;
        });

        return groupedComments.length > 0 ? (
          <div key={groupIndex} className={styles.group}>
            {groupedComments}
          </div>
        ) : null;
      })}
    </div>
  ) : null;
}
