import React from 'react';
import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useInboxStore } from '../hooks/useInboxStore';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useApp } from '../hooks/useApp';
import Comment from './Comment';
import { ArrowBendUpLeft, DotsThree, Smiley } from './icons';
import { } from '../../../client/src/actions';
import { ThreadTarget } from '@collabkit/core';
import * as styles from '../theme/components/InboxItem.css';
import { Composer, Profile, Thread, useComments } from '..';
import { generateObjectIdFromCellId, actions } from '@collabkit/client';

export function InboxItem(props: { formatTimestamp?: (timestamp: number) => string }) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store, renderThreadContextPreview } = useApp();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const { viewingId } = useSnapshot(store);
  const timeline = workspace.timeline[threadId];
  const info = workspace.threadInfo[threadId];
  const commentIds = useComments();

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
        {renderThreadContextPreview?.({
          threadId,
          workspaceId,
          userId,
          info: generateObjectIdFromCellId(info),
        })}
        <Comment.Root commentId={firstCommentId} className={styles.commentRoot}>
          <div className={styles.nameAndTimestampWrapper}>
            <Comment.CreatorAvatar />
            <Comment.CreatorName className={styles.name} />
            <Comment.Timestamp className={styles.timestamp} format={props.formatTimestamp} />
            <div style={{ flex: 1 }}></div>
            {firstComment.createdById === userId ? <Thread.ResolveIconButton /> : null}
            <ArrowBendUpLeft size={16} />
            <Smiley size={16} />
            <DotsThree size={16} />
          </div>
          <div style={{paddingLeft:32}}>
          <Comment.Body />
          </div>
          <Thread.UnreadDot />
        </Comment.Root>
      </div>
      {commentIds.length > 1 ?
        <div className={styles.root()} style={{ paddingLeft: 32 }}>
          {commentIds.slice(1).map((commentId) => (
            <Comment.Root commentId={commentId} className={styles.commentRoot}>
              <div className={styles.nameAndTimestampWrapper}>
                <Comment.CreatorAvatar />
                <Comment.CreatorName className={styles.name} />
                <Comment.Timestamp className={styles.timestamp} format={props.formatTimestamp} />
                <div style={{ flex: 1 }}></div>
                <Smiley size={16} />
                <DotsThree size={16} />
              </div>
              <div className={styles.threadReplyWrapper}>
                <Comment.Body />
              </div>
            </Comment.Root>
          ))}

        </div>
        : null}
      <div className={styles.composerWrapper}>
        {store.userId ?
          <Profile.Provider profileId={store.userId}>
            <Composer />
          </Profile.Provider>
          : null
        }
      </div>
    </Thread.Provider>
  );
}
