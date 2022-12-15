import React, { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useThreadSubscription } from '../hooks/useThread';
import { useSnapshot } from 'valtio';
import { ThreadContext } from '../hooks/useThreadContext';
import Profile from './Profile';
import Composer from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../theme/components/Thread.css';
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

function ThreadRoot(props: ThreadProps & React.ComponentPropsWithoutRef<'div'>) {
  const { threadId, info, defaultSubscribers } = props;
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);

  useThreadSubscription({ store, threadId, workspaceId });
  useSaveThreadInfo({ threadId, workspaceId, info, defaultSubscribers });

  if (!userId) {
    return null;
  }
  return (
    <ThreadProvider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <div {...props} className={props.className ?? styles.root} />
        </ThemeWrapper>
      </Profile.Provider>
    </ThreadProvider>
  );
}

function ThreadHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={props.className ?? styles.header} />;
}

export function Thread(props: ThreadProps) {
  return (
    <Thread.Root {...props}>
      {props.showHeader && <Thread.Header>Comments</Thread.Header>}
      <Scrollable autoScroll="bottom">
        <CommentList hideResolveButton={props.hideResolveButton} />
      </Scrollable>
      {props.hideComposer ? null : <Composer />}
    </Thread.Root>
  );
}

Thread.Root = ThreadRoot;
Thread.Header = ThreadHeader;
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
