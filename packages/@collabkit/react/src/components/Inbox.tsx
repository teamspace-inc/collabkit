import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../theme/components/Inbox.css';
import { Scrollable } from './Scrollable';
import { InboxItem } from './InboxItem';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useOptionalSidebarContext } from './Sidebar';
import { useInbox } from '../hooks/public/useInbox';
import { Thread } from './Thread';

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

export function Inbox(props: {
  formatTimestamp?: (timestamp: number) => string;
  maxHeight?: string;
  threadIds?: string[];
}) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);

  const threadIds = useInbox({ filter: 'open', threadIds: props.threadIds });

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const inboxItems = threadIds.map((threadId) => {
    return (
      <Thread.Provider threadId={threadId} key={`inboxThread-${threadId}`}>
        <InboxItem formatTimestamp={props.formatTimestamp} />
      </Thread.Provider>
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

function InboxHeader(props: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={props.className ?? styles.header} />;
}

Inbox.Header = InboxHeader;
