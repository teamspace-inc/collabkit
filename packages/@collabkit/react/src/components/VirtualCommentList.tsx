import { useRef } from 'react';
import React from 'react';
import * as styles from '../theme/components/CommentList.css';
import { NewIndicator } from './NewIndicator';
import { useNewIndicator } from '../hooks/useNewIndicator';
import { useSnapshot, INTERNAL_Snapshot } from 'valtio';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useThreadContext } from '../hooks/useThreadContext';
import { useOptionalChannelContext } from '../hooks/useChannelContext';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { Event, WithID, WithShowHeader } from '@collabkit/core';
import { MemoizedComment } from './MemoizedComment';
import { CommentListProps } from './CommentList';

type ItemProps = CommentListProps & {
  event: INTERNAL_Snapshot<WithShowHeader<WithID<Event>>>;
  isChannel: boolean;
  isResolved: boolean;
  newIndicatorId: string | null;
};
const MemoizedItem = React.memo(function Item({
  isChannel,
  shouldCollapse,
  newIndicatorId,
  event,
  hideResolveButton,
  isResolved,
}: ItemProps) {
  return !isChannel || event.showHeader || shouldCollapse ? (
    <div key={event.id} style={{ minHeight: 34 }}>
      {newIndicatorId === event.id && <NewIndicator />}
      <MemoizedComment
        commentId={event.id}
        hideProfile={!event.showHeader}
        isFirstComment={!hideResolveButton && !isResolved}
      />
    </div>
  ) : (
    <div style={{ minHeight: 34 }} />
  );
});
function VirtualCommentList(props: CommentListProps) {
  const { shouldCollapse, hideResolveButton, ...otherProps } = props;
  const threadId = useThreadContext();
  const workspaceStore = useWorkspaceStore();
  const newIndicatorId = useNewIndicator();
  const isChannel = !!useOptionalChannelContext();
  const { computed } = useSnapshot(workspaceStore);
  const { isResolved, hasFetchedAllProfiles, messageEvents } = computed[threadId] ?? {};
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  return hasFetchedAllProfiles ? (
    <div className={styles.root} {...otherProps} style={{ flex: 1 }}>
      <Virtuoso
        ref={virtuosoRef}
        initialTopMostItemIndex={999}
        defaultItemHeight={34}
        alignToBottom={true}
        data={messageEvents}
        itemContent={(i, event) => {
          return (
            <MemoizedItem
              isChannel={isChannel}
              shouldCollapse={shouldCollapse}
              newIndicatorId={newIndicatorId}
              event={event}
              hideResolveButton={hideResolveButton}
              isResolved={isResolved}
            />
          );
        }}
        followOutput={'auto'}
      />
    </div>
  ) : null;
}
