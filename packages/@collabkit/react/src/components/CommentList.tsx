import { ComponentProps, ReactNode } from 'react';
import React, { Fragment } from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import Comment, { CommentProps } from './Comment';
import { useSnapshot } from 'valtio';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useThreadContext } from '../hooks/useThreadContext';
import { useApp } from '../hooks/useApp';
import { useOptionalChannelContext } from '../hooks/useChannelContext';

export default function CommentList(
  props: ComponentProps<'div'> & {
    hideResolveButton?: boolean;
    isCollapsed?: boolean;
  }
) {
  const { isCollapsed, hideResolveButton, ...otherProps } = props;
  const threadId = useThreadContext();
  const workspaceStore = useWorkspaceStore();
  const newIndicatorId = useNewIndicator();
  const isChannel = !!useOptionalChannelContext();
  const { expandedThreadIds } = useSnapshot(useApp().store);
  const isExpanded = !!expandedThreadIds.find((id) => id === threadId);
  const { computed } = useSnapshot(workspaceStore);
  const { isResolved, hasFetchedAllProfiles, groupedMessages: list } = computed[threadId] ?? {};

  return hasFetchedAllProfiles ? (
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
