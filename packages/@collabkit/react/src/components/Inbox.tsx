import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { ThreadContext } from '../hooks/useThreadContext';
import * as styles from '../styles/components/Inbox.css';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';
import { InboxItem } from './InboxItem';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../styles/components/Thread.css';
import { useOptionalSidebarContext } from './Sidebar';
import { useInbox } from '../hooks/public/useInbox';

export function unique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

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

export function Inbox(props: { formatTimestamp?: (timestamp: number) => string }) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);

  const { items } = useInbox({ filter: 'open' });

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const inboxItems = Object.keys(items).map((threadId) => {
    return (
      <ThreadContext.Provider
        value={{ threadId, workspaceId, userId }}
        key={`inboxThread-${threadId}`}
      >
        <InboxItem formatTimestamp={props.formatTimestamp} />
      </ThreadContext.Provider>
    );
  });

  // account for sidebar title height
  const sidebarContext = useOptionalSidebarContext();
  const style = sidebarContext?.titleHeight
    ? { height: `calc(100% - ${sidebarContext.titleHeight}px)` }
    : {};

  return (
    <ThemeWrapper>
      <div className={styles.root} style={style}>
        {Object.keys(items).length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollAreaRoot>
            <ScrollAreaViewport>{inboxItems}</ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        )}
      </div>
    </ThemeWrapper>
  );
}
