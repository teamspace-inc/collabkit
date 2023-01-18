import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../theme/components/Inbox.css';
import { Scrollable } from './Scrollable';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useOptionalSidebarContext } from './Sidebar';
import { useInbox } from '../hooks/public/useInbox';
import { Thread } from './Thread';
import { ThreadsInboxItem } from './ThreadsInboxItem';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  specialProp?: string;
}

export function EmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

export function ThreadsInbox(props: {
  formatTimestamp?: (timestamp: number) => string;
  maxHeight?: string;
}) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);
  // const [openThreadsMap, setOpenThreadsMap] = useState(new Map());
  const threadIds = useInbox({ filter: 'open' });

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const inboxItems = threadIds.map((threadId) => {
    return (
      <Thread.Provider threadId={threadId} key={`inboxThread-${threadId}`}>
        <ThreadsInboxItem formatTimestamp={props.formatTimestamp} />
      </Thread.Provider>
    );
  });

  // account for sidebar title height
  const sidebarContext = useOptionalSidebarContext();
  const style = sidebarContext?.titleHeight
    ? { height: `calc(${props.maxHeight} - ${sidebarContext.titleHeight}px)` }
    : {};

  return (
    <ThemeWrapper>
      <div className={styles.root} style={style}>
        {threadIds.length === 0 ? (
          <EmptyState />
        ) : (
          <Scrollable maxHeight={props.maxHeight ?? 'unset'} autoScroll='bottom'>{inboxItems}</Scrollable>
        )}
      </div>
    </ThemeWrapper>
  );
}

function InboxHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={props.className ?? styles.header} />;
}

ThreadsInbox.Header = InboxHeader;
