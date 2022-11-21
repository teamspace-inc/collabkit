import React, { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useThreadSubscription } from '../hooks/useThread';
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
import { useSaveThreadInfo } from '../hooks/useSaveThreadInfo';
import { Scrollable } from './Scrollable';

function ThreadProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);
  const { threadId } = props;

  if (userId == null || workspaceId == null) {
    console.error('ThreadProvider: userId or workspaceId is null');
    return null;
  }

  const value = useMemo(
    () => ({
      threadId,
      workspaceId,
      userId,
      autoFocus: props.autoFocus,
    }),
    [threadId, workspaceId, userId, props.autoFocus]
  );

  return <ThreadContext.Provider value={value}>{props.children}</ThreadContext.Provider>;
}

export function Thread(props: ThreadProps) {
  const { threadId, info } = props;
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);

  useThreadSubscription({ store, threadId, workspaceId });
  useSaveThreadInfo({ threadId, workspaceId, info });

  if (!userId) {
    return null;
  }

  return (
    <ThreadProvider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <div className={styles.root} style={props.style}>
            {props.showHeader && <div className={styles.header}>Comments</div>}
            <Scrollable autoScroll="bottom">
              <CommentList hideResolveButton={props.hideResolveButton} />
            </Scrollable>
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
