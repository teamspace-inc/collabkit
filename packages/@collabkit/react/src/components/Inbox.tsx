import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import * as styles from '../theme/components/Inbox.css';
import * as itemStyles from '../theme/components/InboxItem.css';
import * as buttonStyles from '../theme/components/InboxButton.css';
import { Scrollable } from './Scrollable';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useOptionalSidebarContext } from './useOptionalSidebarContext';
import { useInbox } from '../hooks/public/useInbox';
import { useStore } from '../hooks/useStore';
import { actions, generateObjectIdFromCellId } from '@collabkit/client';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { ThreadTarget } from '@collabkit/core';
import { useInboxStore } from '../hooks/useInboxStore';
import { useRenderFnContext } from '../hooks/useRenderFnContext';
import { useUserContext } from '../hooks/useUserContext';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { ReplyCount } from './ReplyCount';
import { ThreadFacepile } from './ThreadFacepile';
import { ThreadUnreadDot } from './ThreadUnreadDot';
import Comment from './Comment';
import { useUnreadThreadsCount } from '../hooks/public/useUnreadThreadsCount';
import CommentIcon from './Comment.svg';
import CommentNotificationIcon from './CommentNotification.svg';

function InboxEmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

function InboxButton(props: { onClick: () => void; children?: React.ReactNode }) {
  const unreadThreadCount = useUnreadThreadsCount();
  const showUnreadDot = unreadThreadCount > 0;

  return (
    <ThemeWrapper>
      <button className={buttonStyles.inboxButton} onClick={props.onClick}>
        {props.children ? (
          props.children
        ) : (
          <>
            {showUnreadDot ? <img src={CommentNotificationIcon} /> : <img src={CommentIcon} />}
            All comments
          </>
        )}
      </button>
    </ThemeWrapper>
  );
}

function InboxItem(props: { formatTimestamp?: (timestamp: number) => string }) {
  const threadId = useThreadContext();
  const userId = useUserContext();
  const workspaceId = useWorkspaceContext();
  const store = useStore();
  const { renderThreadContextPreview } = useRenderFnContext();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const { viewingId } = useSnapshot(store);
  const timeline = workspace.timeline[threadId];
  const info = workspace.threadInfo[threadId];

  if (!timeline) {
    return null;
  }

  const eventIds = Object.keys(timeline);

  const firstCommentId = eventIds[0];

  if (!firstCommentId) {
    return null;
  }

  const firstComment = timeline[firstCommentId];

  if (!firstComment) {
    return null;
  }

  // inbox tracks most recent comment by default
  const lastComment = inbox[threadId];

  const active = !!(viewingId && viewingId.type === 'thread' && viewingId.threadId === threadId);

  return (
    <ThreadContext.Provider value={threadId} key={`inboxThread-${threadId}`}>
      <div
        className={itemStyles.root({ active })}
        onClick={() => {
          const onInboxThreadClick = store.callbacks?.onInboxThreadClick;
          if (onInboxThreadClick) {
            onInboxThreadClick({
              threadId,
              userId,
              workspaceId,
              info: generateObjectIdFromCellId(info),
            });
          } else {
            const pathname = info && info.url && new URL(info.url).pathname;
            if (pathname && pathname !== window.location.pathname) {
              window.history.pushState(null, '', pathname);
            } else {
              const target: ThreadTarget = { type: 'thread', threadId, workspaceId };
              actions.viewContent(store, { target });
            }
          }
        }}
      >
        <div className={itemStyles.header}>
          <ThreadUnreadDot />
          <ThreadFacepile size={itemStyles.facepileSize} />
          <div style={{ flex: 1 }}></div>
          {firstComment.createdById === userId ? <Comment.ThreadResolveIconButton /> : null}
        </div>
        {renderThreadContextPreview?.({
          threadId,
          workspaceId,
          userId,
          info: generateObjectIdFromCellId(info),
        })}
        <Comment.Root commentId={firstCommentId} className={itemStyles.commentRoot}>
          <div className={itemStyles.nameAndTimestampWrapper}>
            <Comment.CreatorName className={itemStyles.name} />
            <Comment.Timestamp className={itemStyles.timestamp} format={props.formatTimestamp} />
          </div>
          <Comment.Body />
        </Comment.Root>
        <Comment.Root commentId={lastComment.id}>
          <div>
            <div className={itemStyles.nameAndTimestampWrapper}>
              <ReplyCount className={itemStyles.replyCount} />
            </div>
          </div>
        </Comment.Root>
      </div>
    </ThreadContext.Provider>
  );
}

function Inbox(props: {
  formatTimestamp?: (timestamp: number) => string;
  maxHeight?: string;
  threadIds?: string[];
}) {
  const store = useStore();
  const { workspaceId, userId } = useSnapshot(store);

  const threadIds = useInbox({ filter: 'open', threadIds: props.threadIds, latestFirst: true });

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  useEffect(() => {
    actions.subscribeInbox(store);
  }, [store]);

  const inboxItems = threadIds.map((threadId) => {
    return (
      <ThreadContext.Provider value={threadId} key={`inboxThread-${threadId}`}>
        <InboxItem formatTimestamp={props.formatTimestamp} />
      </ThreadContext.Provider>
    );
  });

  // account for sidebar title height
  const sidebarContext = useOptionalSidebarContext();
  const style = sidebarContext?.titleHeight
    ? {
        height: `calc(${props.maxHeight ? props.maxHeight : '100%'} - ${
          sidebarContext.titleHeight
        }px)`,
      }
    : {};

  return (
    <ThemeWrapper>
      <div className={styles.root} style={style}>
        {threadIds.length === 0 ? (
          <InboxEmptyState />
        ) : (
          <Scrollable maxHeight={props.maxHeight ?? 'unset'}>{inboxItems}</Scrollable>
        )}
      </div>
    </ThemeWrapper>
  );
}

export default Object.assign(Inbox, {
  EmptyState: InboxEmptyState,
  Item: InboxItem,
  Button: InboxButton,
});
