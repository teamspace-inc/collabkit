import React, { useEffect } from 'react';
import { actions } from '@collabkit/client';
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
import { timelineUtils } from '@collabkit/core';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../styles/components/Thread.css';

export function unique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  specialProp?: string;
}

// export function EmptyState() {
//   return (
//     <div className={styles.emptyState.root}>
//       <div className={styles.emptyState.title}>No comments</div>
//       <div className={styles.emptyState.body}>Comments on this view will appear here.</div>
//     </div>
//   );
// }

// const emptyState = (
//   <div className={styles.emptyState}>
//     <ChatCentered weight="thin" size={32} />
//     <span>No comments yet</span>
//   </div>
// );

export function EmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

export function Inbox() {
  const { store } = useApp();
  const { workspaceId, workspaces, userId } = useSnapshot(store);

  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const inbox = workspace?.inbox;

  useEffect(() => {
    actions.subscribeInbox(store);
  }, [workspaceId]);

  if (!inbox) {
    return null;
  }

  if (!userId) {
    return null;
  }

  if (!workspaceId) {
    return null;
  }

  // todo this won't scale so we should add a view to load
  // inboxResolved and inboxOpen
  const inboxItems = inbox
    ? // show threads with latest activity first
      Object.keys(inbox)
        .sort((a, b) => {
          const aTime = +inbox[a].createdAt ?? 0;
          const bTime = +inbox[b].createdAt ?? 0;
          return bTime - aTime;
        })
        // filter out resolved threads
        ?.filter(
          (threadId) =>
            !(
              workspace.timeline?.[threadId] &&
              timelineUtils.computeIsResolved(workspace.timeline?.[threadId])
            )
        )
        .map((threadId) => {
          return (
            <ThreadContext.Provider
              value={{ threadId, workspaceId, userId }}
              key={`inboxThread-${threadId}`}
            >
              <InboxItem />
            </ThreadContext.Provider>
          );
        })
    : [];

  const isEmpty = inboxItems?.filter((item) => item !== null).length === 0;

  return (
    <ThemeWrapper>
      <div className={styles.root}>
        {isEmpty ? (
          <EmptyState />
        ) : (
          <ScrollAreaRoot>
            <ScrollAreaViewport>
              {inboxItems}
              {/* <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6A7278' }}>
              No more comments
            </div> */}
            </ScrollAreaViewport>
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
