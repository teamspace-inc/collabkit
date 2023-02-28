import React from 'react';
import { ThreadContext } from '../hooks/useThreadContext';
import { Composer } from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../theme/components/Thread.css';
import { ChatCentered } from './icons';
import { CommentList } from './CommentList';
import { ThreadFacepile } from './ThreadFacepile';
import { ThreadUnreadDot } from './ThreadUnreadDot';
import { ThreadProps } from '../types';
import { Scrollable } from './Scrollable';
import { useThread } from '../hooks/public/useThread';
import { ProfileContext } from '../hooks/useProfile';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';

const emptyState = (
  <div data-testid="collabkit-thread-empty-state" className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

function ThreadEmptyState() {
  return emptyState;
}

function ThreadRoot(props: ThreadProps & React.ComponentPropsWithoutRef<'div'>) {
  const { userId } = useThread(props);
  return (
    <ThreadContext.Provider value={props.threadId}>
      <ProfileContext.Provider value={userId}>
        <div data-testid="collabkit-thread-root" className={styles.root} {...props} />
      </ProfileContext.Provider>
    </ThreadContext.Provider>
  );
}

function ThreadHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div data-testid="collabkit-thread-header" className={styles.header} {...props} />;
}

function Thread(props: ThreadProps & React.ComponentPropsWithoutRef<'div'>) {
  return useIsAuthenticated() ? (
    <ThemeWrapper>
      <div {...props}>
        <ThreadRoot threadId={props.threadId}>
          {props.showHeader && <ThreadHeader>Comments</ThreadHeader>}
          <Scrollable autoScroll="bottom">
            <CommentList />
          </Scrollable>
          {props.hideComposer ? null : (
            <Composer autoFocus={props.autoFocus} placeholder={props.placeholder} />
          )}
        </ThreadRoot>
      </div>
    </ThemeWrapper>
  ) : null;
}

export { Thread, ThreadRoot, ThreadHeader, ThreadFacepile, ThreadUnreadDot, ThreadEmptyState };
