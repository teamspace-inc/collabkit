import React from 'react';
import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useInboxStore } from '../hooks/useInboxStore';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { CommentBody, CommentCreatorName, CommentRoot, CommentTimestamp } from './Comment';
import { ReplyCount } from './ReplyCount';
import {} from '../../../client/src/actions';
import { ThreadTarget } from '@collabkit/core';
import * as styles from '../theme/components/InboxItem.css';
import { ThreadFacepile } from './ThreadFacepile';
import { generateObjectIdFromCellId, actions } from '@collabkit/client';
import { useUserContext } from '../hooks/useUserContext';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useStore } from '../hooks/useStore';
import { useRenderFnContext } from '../hooks/useRenderFnContext';
import { ThreadResolveIconButton, ThreadProvider } from './Thread';
import { ThreadUnreadDot } from './ThreadUnreadDot';

export function InboxItem(props: { formatTimestamp?: (timestamp: number) => string }) {
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
    <ThreadProvider threadId={threadId} key={`inboxThread-${threadId}`}>
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
              actions.viewContent(store, { target });
            }
          }
        }}
      >
        <div className={styles.header}>
          <ThreadUnreadDot />
          <ThreadFacepile size={styles.facepileSize} />
          <div style={{ flex: 1 }}></div>
          {firstComment.createdById === userId ? <ThreadResolveIconButton /> : null}
        </div>
        {renderThreadContextPreview?.({
          threadId,
          workspaceId,
          userId,
          info: generateObjectIdFromCellId(info),
        })}
        <CommentRoot commentId={firstCommentId} className={styles.commentRoot}>
          <div className={styles.nameAndTimestampWrapper}>
            <CommentCreatorName className={styles.name} />
            <CommentTimestamp className={styles.timestamp} format={props.formatTimestamp} />
          </div>
          <CommentBody />
        </CommentRoot>
        <CommentRoot commentId={lastComment.id}>
          <div>
            <div className={styles.nameAndTimestampWrapper}>
              <ReplyCount className={styles.replyCount} />
            </div>
          </div>
        </CommentRoot>
      </div>
    </ThreadProvider>
  );
}
