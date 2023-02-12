import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import * as styles from '../theme/components/Inbox.css';
import { Scrollable } from './Scrollable';
import { InboxItem } from './InboxItem';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useOptionalSidebarContext } from './useOptionalSidebarContext';
import { useInbox } from '../hooks/public/useInbox';
import { ThreadProvider } from './Thread';
import { useStore } from '../hooks/useStore';
import { actions } from '@collabkit/client';

function EmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

function Inbox(props: {
  formatTimestamp?: (timestamp: number) => string;
  maxHeight?: string;
  threadIds?: string[];
}) {
  const store = useStore();
  const { workspaceId, userId } = useSnapshot(store);

  const threadIds = useInbox({ filter: 'open', threadIds: props.threadIds, latestFirst: true });

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  useEffect(() => {
    actions.subscribeInbox(store);
  }, [store]);

  const inboxItems = threadIds.map((threadId) => {
    return (
      <ThreadProvider threadId={threadId} key={`inboxThread-${threadId}`}>
        <InboxItem formatTimestamp={props.formatTimestamp} />
      </ThreadProvider>
    );
  });

  // account for sidebar title height
  const sidebarContext = useOptionalSidebarContext();
  const style = sidebarContext?.titleHeight
    ? {
        height: `calc(${props.maxHeight ? props.maxHeight : '100%'} - ${
          sidebarContext.titleHeight
        }px)`,
      }
    : {};

  return (
    <ThemeWrapper>
      <div className={styles.root} style={style}>
        {threadIds.length === 0 ? (
          <EmptyState />
        ) : (
          <Scrollable maxHeight={props.maxHeight ?? 'unset'}>{inboxItems}</Scrollable>
        )}
      </div>
    </ThemeWrapper>
  );
}

export { Inbox, EmptyState };
