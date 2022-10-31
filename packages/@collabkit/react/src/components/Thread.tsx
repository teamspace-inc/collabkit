import React from 'react';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';
import { ThreadContext } from '../hooks/useThreadContext';
import Profile from './Profile';
import Composer from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../styles/components/Thread.css';
import { ChatCentered } from './icons';
import CommentList from './CommentList';
import { useThread } from '../hooks/useThread';
import { useSaveThreadInfo } from './useSaveThreadInfo';

export type ThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
};

export function ThreadProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { threadId } = props;
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);

  useSaveThreadInfo({ workspaceId, threadId, info: props.info });

  if (userId == null || workspaceId == null) {
    return null;
  }

  return (
    <ThreadContext.Provider value={{ threadId, userId, workspaceId }}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>{props.children}</ThemeWrapper>
      </Profile.Provider>
    </ThreadContext.Provider>
  );
}

const ThreadRoot = (props: React.ComponentProps<'div'>) => (
  <div {...props} className={props.className ?? styles.root} />
);

export function Thread(props: ThreadProps & { className?: string; children?: React.ReactNode }) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);

  useThread({ ...props, store, workspaceId });

  if (!userId) {
    return null;
  }

  return (
    <Thread.Provider {...props}>
      <Thread.Root>
        {props.showHeader && <div className={styles.header}>Comments</div>}
        <ScrollableCommentList>
          <CommentList />
        </ScrollableCommentList>
        {props.hideComposer ? null : <Composer autoFocus={props.autoFocus ?? true} />}
      </Thread.Root>
    </Thread.Provider>
  );
}

Thread.Root = ThreadRoot;
Thread.Provider = ThreadProvider;
Thread.EmptyState = EmptyState;

const emptyState = (
  <div className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

export function EmptyState() {
  return emptyState;
}
