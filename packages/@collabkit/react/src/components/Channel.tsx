import React, { ComponentPropsWithRef, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../theme/components/Channel.css';
import { Scrollable } from './Scrollable';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useInbox } from '../hooks/public/useInbox';
import { Thread } from './Thread';
import Composer from './composer/Composer';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import CommentList from './CommentList';
import { ChannelContext } from '../hooks/useChannelContext';
import { vars } from '../theme/theme/index.css';
import { useStore } from '../hooks/useStore';

function EmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

function ChannelThread() {
  const threadId = useThreadContext();
  const store = useStore();
  const workspace = useSnapshot(useWorkspaceStore());
  const { expandedThreadIds } = useSnapshot(store);
  const timeline = workspace.timeline[threadId];

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

  // const active = !!(viewingId && viewingId.type === 'thread' && viewingId.threadId === threadId);
  const isExpanded = expandedThreadIds.includes(threadId);

  return (
    <Thread.Provider threadId={threadId} key={`channelThread-${threadId}`} placeholder="Reply">
      <CommentList isCollapsed={!isExpanded} className="" />
      {isExpanded ? (
        <div style={{ paddingLeft: vars.space[8] }}>
          <Composer />
        </div>
      ) : null}
    </Thread.Provider>
  );
}

type ChannelProps = { channelId: string };

function ChannelRoot(props: ComponentPropsWithRef<'div'> & ChannelProps) {
  const { workspaceId } = useSnapshot(useApp().store);

  return workspaceId ? (
    <ThemeWrapper>
      <ChannelContext.Provider value={{ workspaceId, channelId: 'default' }}>
        <div className={styles.root}>{props.children}</div>
      </ChannelContext.Provider>
    </ThemeWrapper>
  ) : null;
}

function ChannelThreadList() {
  const threadIds = useInbox({ filter: 'open', direction: 'asc' });
  const threads = threadIds.map((threadId) => {
    return (
      <Thread.Provider threadId={threadId} key={`inboxThread-${threadId}`}>
        <Channel.Thread />
      </Thread.Provider>
    );
  });

  return threadIds.length === 0 ? (
    <EmptyState />
  ) : (
    <Scrollable autoScroll="bottom">{threads}</Scrollable>
  );
}

// for now there is one default channel per workspace
// we may want to introduce channel ids in the future
export function Channel() {
  const store = useStore();

  // we should refactor this to a simpler hasAuthenticated check we can reuse, which guarantees
  // userId and workspaceId are present, we sort of have this with UnconfiguredStore and Store
  // but we probably want an UnauthenticatedStore as well.
  // UnconfiguredStore -> UnauthenticatedStore -> Store
  // We should also look at using React.Suspense to support loading states
  // for all top level components while authentication is in progress
  const { appId, userId, workspaceId, nextThreadId } = useSnapshot(store);

  if (!appId) {
    return null;
  }

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  useEffect(() => {
    store.nextThreadId = store.sync.nextThreadId({ appId, workspaceId });
  }, []);

  return (
    <Channel.Root channelId="default">
      <Channel.ThreadList />
      {nextThreadId ? (
        <Thread.Provider threadId={nextThreadId}>
          <div>
            <Composer />
          </div>
        </Thread.Provider>
      ) : null}
    </Channel.Root>
  );
}

Channel.Root = ChannelRoot;
Channel.ThreadList = ChannelThreadList;
Channel.Thread = ChannelThread;
