import { ComponentProps } from 'react';
import React from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import { useSnapshot } from 'valtio';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useThreadContext } from '../hooks/useThreadContext';
import { MemoizedComment } from './MemoizedComment';

export type CommentListProps = ComponentProps<'div'> & {
  hideResolveButton?: boolean;
  shouldCollapse?: boolean;
};

function CommentList(props: CommentListProps) {
  const { shouldCollapse, hideResolveButton, children, ...otherProps } = props;
  const threadId = useThreadContext();
  const workspaceStore = useWorkspaceStore();
  const newIndicatorId = useNewIndicator();
  const { computed } = useSnapshot(workspaceStore);
  const { hasFetchedAllProfiles, messageEvents } = computed[threadId] ?? {};

  if (!hasFetchedAllProfiles) {
    return null;
  }

  const comments =
    props.children ||
    messageEvents.map((event, i) => {
      return (shouldCollapse && i == 0) || !shouldCollapse ? (
        <div key={event.id} style={{ minHeight: 34 }}>
          {newIndicatorId === event.id && <NewIndicator />}
          {props.children ?? (
            <MemoizedComment
              commentId={event.id}
              hideProfile={!event.showHeader}
              isFirstComment={i == 0}
            />
          )}
        </div>
      ) : null;
    });

  return hasFetchedAllProfiles ? (
    <div className={styles.root} {...otherProps}>
      {comments}
    </div>
  ) : null;
}

export { CommentList };
