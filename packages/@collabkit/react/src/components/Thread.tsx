import React, { useMemo } from 'react';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { useSnapshot } from 'valtio';
import { ThreadContext } from '../hooks/useThreadContext';
import Profile from './Profile';
import Composer from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../styles/components/Thread.css';
import { ChatCentered } from './icons';
import CommentList from './CommentList';
import { ThreadFacepile } from './ThreadFacepile';
import { ThreadUnreadDot } from './ThreadUnreadDot';
import { ResolveThreadIconButton } from './ResolveThreadIconButton';
import { ThreadProps } from '../types';

export function ThreadProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);
  const { threadId } = props;

  if (userId == null || workspaceId == null) {
    return null;
  }

  const value = useMemo(
    () => ({
      threadId,
      workspaceId,
      userId,
    }),
    [threadId, workspaceId, userId]
  );

  return <ThreadContext.Provider value={value}>{props.children}</ThreadContext.Provider>;
}

export function Thread(props: ThreadProps & { className?: string; children?: React.ReactNode }) {
  const { threadId } = props;
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);
  const { isEmpty } = useThread({
    store,
    threadId,
    workspaceId,
  });

  if (!userId) {
    return null;
  }

  return (
    <ThreadProvider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <div className={styles.root}>
            {props.showHeader && <div className={styles.header}>Comments</div>}
            {isEmpty ? (
              <EmptyState />
            ) : (
              <ScrollableCommentList>
                <CommentList />
              </ScrollableCommentList>
            )}
            {props.hideComposer ? null : <Composer />}
          </div>
        </ThemeWrapper>
      </Profile.Provider>
    </ThreadProvider>
  );
}

Thread.Provider = ThreadProvider;
Thread.Facepile = ThreadFacepile;
Thread.UnreadDot = ThreadUnreadDot;
Thread.ResolveIconButton = ResolveThreadIconButton;

const emptyState = (
  <div className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

export function EmptyState() {
  return emptyState;
}
