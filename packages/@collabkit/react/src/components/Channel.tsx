import React, { ComponentPropsWithRef, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../theme/components/Channel.css';
import { Scrollable } from './Scrollable';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useInbox } from '../hooks/public/useInbox';
import { ThreadProvider } from './Thread';
import { Composer } from './composer/Composer';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { CommentList } from './CommentList';
import { ChannelContext } from '../hooks/useChannelContext';
import { vars } from '../theme/theme/index.css';
import { useStore } from '../hooks/useStore';
import { actions } from '@collabkit/client';
import { calc } from '@vanilla-extract/css-utils';
import { useStoreKeyMatches } from '../hooks/useSubscribeStoreKey';

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

  const isSelected = useStoreKeyMatches(store, 'selectedId', (selectedId) => {
    return selectedId?.type === 'thread' && selectedId.threadId === threadId;
  });

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
    <ThreadProvider threadId={threadId} key={`channelThread-${threadId}`} placeholder="Reply">
      <CommentList
        shouldCollapse={!isExpanded}
        className=""
        style={{
          border: isSelected ? '1px solid red' : 'blue',
          padding: '20px',
        }}
      />
      {isExpanded ? (
        <div style={{ paddingLeft: `${calc.multiply(vars.space[1], 9)}` }}>
          <Composer placeholder="Reply" autoFocus={true} />
        </div>
      ) : null}
    </ThreadProvider>
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
      <ThreadProvider threadId={threadId} key={`inboxThread-${threadId}`}>
        <ChannelThread />
      </ThreadProvider>
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
function Channel() {
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
    actions.subscribeInbox(store);
  }, [appId, workspaceId]);

  return (
    <ChannelRoot channelId="default">
      <ChannelThreadList />
      {nextThreadId ? (
        <ThreadProvider threadId={nextThreadId}>
          <div>
            <Composer isNewThread={true} />
          </div>
        </ThreadProvider>
      ) : null}
    </ChannelRoot>
  );
}

export { Channel, ChannelRoot, ChannelThreadList, ChannelThread };
