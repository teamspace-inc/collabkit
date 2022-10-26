import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { ResolveThreadIconButton } from './ResolveThreadIconButton';
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
import * as styles from '../styles/components/InboxItem.css';
import { vars } from '../styles/theme';
import { fallbackVar } from '@vanilla-extract/css';

export function InboxItem(props: { formatTimestamp?: (timestamp: number) => string }) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store, renderThreadContextPreview } = useApp();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const { viewingId } = useSnapshot(store);
  const timeline = workspace.timeline[threadId];
  const info = workspace.threadInfo[threadId];
  const replyCount = useReplyCount();
  const [hover, setHover] = useState(false);

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
    <ThreadContext.Provider
      value={{ threadId, workspaceId, userId }}
      key={`inboxThread-${threadId}`}
    >
      <div
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={styles.root({ active })}
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
        <div className={styles.header}>
          <UnreadDot className={styles.unreadDot} />
          <ThreadCommentersFacepile
            size={fallbackVar(vars.inbox.item.facepile.avatar.size, vars.avatar.size)}
            hover={hover}
          />
          <div style={{ flex: 1 }}></div>
          {firstComment.createdById === userId ? <ResolveThreadIconButton /> : null}
        </div>
        {renderThreadContextPreview?.({ threadId, workspaceId, userId, info })}
        <Comment.Root eventId={firstCommentId} className={styles.commentRoot}>
          <div className={styles.nameAndTimestampWrapper}>
            <Comment.CreatorName className={styles.name} />
            <Comment.Timestamp className={styles.timestamp} format={props.formatTimestamp} />
          </div>
          <Comment.Body />
        </Comment.Root>
        <Comment.Provider eventId={lastComment.id}>
          {replyCount > 0 ? (
            <div>
              <div className={styles.nameAndTimestampWrapper}>
                <ReplyCount className={styles.replyCount} />
                <span className={styles.timestamp}>
                  Last reply{' '}
                  <Comment.Timestamp className={styles.timestamp} format={props.formatTimestamp} />
                </span>
              </div>
            </div>
          ) : null}
        </Comment.Provider>
      </div>
    </ThreadContext.Provider>
  );
}
