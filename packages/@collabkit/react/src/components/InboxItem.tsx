import React from 'react';
import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useInboxStore } from '../hooks/useInboxStore';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useApp } from '../hooks/useApp';
import Comment from './Comment';
import { ReplyCount } from './ReplyCount';
import {} from '../../../client/src/actions';
import { ThreadTarget } from '@collabkit/core';
import * as styles from '../theme/components/InboxItem.css';
import { Thread } from '..';
import { generateObjectIdFromCellId, actions } from '@collabkit/client';

export function InboxItem(props: { formatTimestamp?: (timestamp: number) => string }) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store, renderThreadContextPreview } = useApp();
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
    <Thread.Provider threadId={threadId} key={`inboxThread-${threadId}`}>
      <div
        className={styles.root({ active })}
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
              actions.viewThread(store, { target });
            }
          }
        }}
      >
        <div className={styles.header}>
          <Thread.UnreadDot />
          <Thread.Facepile size={styles.facepileSize} />
          <div style={{ flex: 1 }}></div>
          {firstComment.createdById === userId ? <Thread.ResolveIconButton /> : null}
        </div>
        {renderThreadContextPreview?.({
          threadId,
          workspaceId,
          userId,
          info: generateObjectIdFromCellId(info),
        })}
        <Comment.Root commentId={firstCommentId} className={styles.commentRoot}>
          <div className={styles.nameAndTimestampWrapper}>
            <Comment.CreatorName className={styles.name} />
            <Comment.Timestamp className={styles.timestamp} format={props.formatTimestamp} />
          </div>
          <Comment.Body />
        </Comment.Root>
        <Comment.Provider eventId={lastComment.id}>
          <div>
            <div className={styles.nameAndTimestampWrapper}>
              <ReplyCount className={styles.replyCount} />
            </div>
          </div>
        </Comment.Provider>
      </div>
    </Thread.Provider>
  );
}
