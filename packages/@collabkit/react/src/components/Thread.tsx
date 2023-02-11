import React from 'react';
import { useSnapshot } from 'valtio';
import { ThreadContext } from '../hooks/useThreadContext';
import Profile from './Profile';
import Composer from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../theme/components/Thread.css';
import { ChatCentered } from './icons';
import { CommentList } from './CommentList';
import { ThreadFacepile } from './ThreadFacepile';
import { ThreadUnreadDot } from './ThreadUnreadDot';
import { ResolveThreadIconButton } from './ResolveThreadIconButton';
import { ThreadProps } from '../types';
import { Scrollable } from './Scrollable';
import { useThread } from '../hooks/public/useThread';
import { useStore } from '../hooks/useStore';

function ThreadProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { userId, workspaceId } = useSnapshot(useStore());
  const { threadId } = props;

  if (userId == null || workspaceId == null) {
    console.error('ThreadProvider: userId or workspaceId is null');
    return null;
  }

  return <ThreadContext.Provider value={threadId}>{props.children}</ThreadContext.Provider>;
}

function ThreadRoot(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-testid="collabkit-thread-root" className={styles.root} {...props} />;
}

function ThreadHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-testid="collabkit-thread-header" className={styles.header} {...props} />;
}

export function Thread(props: ThreadProps) {
  // todo refactor this usage of userId and move it to a generic guard
  const { userId } = useThread(props);

  if (!userId) {
    return null;
  }

  return (
    <ThreadContext.Provider value={props.threadId}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <Thread.Root>
            {props.showHeader && <Thread.Header>Comments</Thread.Header>}
            <Scrollable autoScroll="bottom">
              <CommentList hideResolveButton={props.hideResolveButton} />
            </Scrollable>
            {props.hideComposer ? null : (
              <Composer autoFocus={props.autoFocus} placeholder={props.placeholder} />
            )}
          </Thread.Root>
        </ThemeWrapper>
      </Profile.Provider>
    </ThreadContext.Provider>
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
