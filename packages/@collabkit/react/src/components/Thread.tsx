import React, { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
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
import { Scrollable } from './Scrollable';
import { useThread } from '../hooks/public/useThread';

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
      placeholder: props.placeholder,
    }),
    [threadId, workspaceId, userId, props.autoFocus, props.placeholder]
  );

  return <ThreadContext.Provider value={value}>{props.children}</ThreadContext.Provider>;
}

function ThreadRoot(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-testid="collabkit-thread-root"
      {...props}
      className={props.className ?? styles.root}
    />
  );
}

function ThreadHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      data-testid="collabkit-thread-header"
      {...props}
      className={props.className ?? styles.header}
    />
  );
}

export function Thread(props: ThreadProps) {
  const { userId } = useThread(props);

  if (!userId) {
    return null;
  }

  return (
    <Thread.Provider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <Thread.Root className={props.className} style={props.style}>
            {props.showHeader && <Thread.Header>Comments</Thread.Header>}
            <Scrollable autoScroll="bottom">
              <CommentList hideResolveButton={props.hideResolveButton} />
            </Scrollable>
            {props.hideComposer ? null : <Composer />}
          </Thread.Root>
        </ThemeWrapper>
      </Profile.Provider>
    </Thread.Provider>
  );
}

Thread.Root = ThreadRoot;
Thread.Header = ThreadHeader;
Thread.Provider = ThreadProvider;
Thread.Facepile = ThreadFacepile;
Thread.UnreadDot = ThreadUnreadDot;
Thread.ResolveIconButton = ResolveThreadIconButton;

const emptyState = (
  <div data-testid="collabkit-thread-empty-state" className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

export function EmptyState() {
  return emptyState;
}
