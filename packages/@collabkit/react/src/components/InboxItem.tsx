import React from 'react';
import { useSnapshot } from 'valtio';
import { differenceInHours, format, formatDistanceStrict, isSameDay, isSameMonth } from 'date-fns';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { ResolveThreadButton } from './ResolveThreadButton';
import { ThreadCommentersFacepile } from './ThreadCommentersFacepile';
import { useInboxStore } from '../hooks/useInboxStore';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useReplyCount } from '../hooks/useReplyCount';
import { useApp } from '../hooks/useApp';
import * as Comment from './Comment';
import { ReplyCount } from './ReplyCount';
import { UnreadDot } from './UnreadDot';
import { actions } from '../../../client/src/actions';
import { ThreadTarget } from '@collabkit/core';
import * as styles from '../styles/InboxItem.css';

// Cashboard relative timestamp
//
// Spec:
// If comment’s date is current date, display “Today at HH:MM AM/PM”.
// If it isn’t current date, display “[h] hours ago” up until 48 hours,
// and then display days (“[d] days ago”) up until the comment date’s
// month isn’t the current month, then display “[m] months ago”.
function formatTimestampRelative(timestamp: number, now: number) {
  if (isSameDay(timestamp, now)) {
    return format(timestamp, "'Today' 'at' p");
  }
  if (Math.abs(differenceInHours(timestamp, now)) <= 48) {
    return formatDistanceStrict(timestamp, now, { unit: 'hour', addSuffix: true });
  }
  if (isSameMonth(timestamp, now)) {
    return formatDistanceStrict(timestamp, now, { unit: 'day', addSuffix: true });
  }
  return formatDistanceStrict(timestamp, now, { unit: 'month', addSuffix: true });
}

export function InboxItem() {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store, renderThreadContextPreview } = useApp();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const timeline = workspace.timeline[threadId];
  const info = workspace.threadInfo[threadId];
  const replyCount = useReplyCount();

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

  return (
    <ThreadContext.Provider
      value={{ threadId, workspaceId, userId }}
      key={`inboxThread-${threadId}`}
    >
      <div
        className={styles.root}
        onClick={() => {
          const onInboxThreadClick = store.callbacks?.onInboxThreadClick;
          if (onInboxThreadClick) {
            onInboxThreadClick({ threadId, userId, workspaceId, info });
          } else {
            const pathname = info && info.url && new URL(info.url).pathname;
            if (pathname && pathname !== window.location.pathname) {
              window.history.pushState(null, '', pathname);
            } else {
              const target: ThreadTarget = { type: 'thread', threadId, workspaceId };
              actions.viewThread(store, { target, isPreview: false });
            }
          }
        }}
      >
        <div>
          <div className={styles.header}>
            <UnreadDot className={styles.unreadDot} />
            <ThreadCommentersFacepile />
            <div style={{ flex: 1 }}></div>
            <ResolveThreadButton />
          </div>
          {renderThreadContextPreview?.({ threadId, workspaceId, userId, info })}
          <Comment.Root eventId={firstCommentId} className={styles.commentRoot}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}
              >
                <Comment.CreatorName className={styles.name} />
                <Comment.Timestamp className={styles.timestamp} format={formatTimestampRelative} />
              </div>
              <Comment.Body />
            </div>
          </Comment.Root>
          <Comment.Root eventId={lastComment.id} className={styles.commentRoot}>
            <div>
              {replyCount > 0 ? (
                <>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <ReplyCount className={styles.replyCount} />
                    <Comment.Timestamp
                      className={styles.timestamp}
                      format={formatTimestampRelative}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </Comment.Root>
        </div>
      </div>
    </ThreadContext.Provider>
  );
}
