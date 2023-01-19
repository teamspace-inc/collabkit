import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useThreadContext } from '../hooks/useThreadContext';
import { useInboxStore } from '../hooks/useInboxStore';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useApp } from '../hooks/useApp';
import Comment from './Comment';
import { ArrowBendDownRight, ArrowBendUpLeft, DotsThree, Smiley } from './icons';
import { } from '../../../client/src/actions';
import * as styles from '../theme/components/ThreadsInboxItem.css';
import { Composer, Profile, Thread, useComments } from '..';
import { generateObjectIdFromCellId, actions } from '@collabkit/client';

export function ThreadsInboxItem(props: { formatTimestamp?: (timestamp: number) => string }) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store, renderThreadContextPreview } = useApp();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const { viewingId } = useSnapshot(store);
  const timeline = workspace.timeline[threadId];
  const info = workspace.threadInfo[threadId];
  const commentIds = useComments();
  const [repliesVisible, setrepliesVisible] = useState(false);

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
            <ArrowBendUpLeft size={16} onClick={() => { setrepliesVisible(true) }}/>
            <Smiley size={16} />
            <DotsThree size={16} />
          </div>
          <div style={{ paddingLeft: 32 }}>
            <Comment.Body />
          </div>
          {!repliesVisible && commentIds.length > 1 ?
            <div className={styles.threadReplyWrapper} onClick={() => { setrepliesVisible(true) }}>
              <ArrowBendDownRight size={16} color="#888888" style={{ paddingTop: 1 }} /> <div> &nbsp;{commentIds.length - 1} {commentIds.length != 2 ? "replies" : "reply"} </div>
            </div>
            :
            null
          }
        </Comment.Root>
      </div>
      {repliesVisible ?
        <>
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
                  <div className={styles.threadReplyCommentWrapper}>
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
        </>
        :
        null
      }

    </Thread.Provider>
  );
}
