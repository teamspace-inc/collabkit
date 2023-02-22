import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import * as styles from '../theme/components/Inbox.css';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useInbox } from '../hooks/public/useInbox';
import { useStore } from '../hooks/useStore';
import { actions } from '@collabkit/client';
import { SidebarCloseButton, SidebarHeader, SidebarRoot, SidebarTitle } from './Sidebar';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import {
  CommentThreadResolveIconButton,
  CommentRoot,
  CommentCreatorName,
  CommentTimestamp,
  CommentBody,
  CommentMarkdown,
  CommentSeeAllRepliesButton,
} from './Comment';
import { ThreadFacepile } from './ThreadFacepile';
import { ThreadUnreadDot } from './ThreadUnreadDot';
import * as inboxItemStyles from '../theme/components/InboxItem.css';
import { Authenticated } from './Authenticated';
import { useStoreKeyMatches } from '../hooks/useSubscribeStoreKey';
import { useApp } from '../hooks/useApp';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from './Popover';
import { usePopover } from '../hooks/usePopover';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';
import { Root } from './Root';
import { Scrollable } from './Scrollable';

function InboxEmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

function InboxItem() {
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const store = useStore();
  const workspace = useSnapshot(useWorkspaceStore());
  const { events } = useApp();

  const selected = useStoreKeyMatches(
    store,
    'selectedId',
    (selectedId) =>
      !!(
        selectedId &&
        (selectedId.type === 'thread' ||
          selectedId.type === 'pin' ||
          selectedId.type === 'commentPin') &&
        selectedId.threadId === threadId
      )
  );

  const timeline = workspace?.timeline[threadId];
  const firstCommentId = Object.keys(timeline ?? {})[0];
  const isResolved = workspace?.computed[threadId]?.isResolved;

  // wait till we know if the thread is resolved
  // is calculated when the firstComment is present
  if (!firstCommentId || isResolved) {
    return null;
  }

  return (
    <div
      className={inboxItemStyles.root({ selected })}
      onClick={(e) =>
        events.onClick(e, {
          target: {
            type: 'inboxItem',
            threadId,
            workspaceId,
          } as const,
        })
      }
      key={`inboxThread-${threadId}`}
    >
      <div className={inboxItemStyles.header}>
        <ThreadUnreadDot />
        <ThreadFacepile size={inboxItemStyles.facepileSize} />
        <div style={{ flex: 1 }}></div>
        <CommentThreadResolveIconButton />
      </div>
      <CommentRoot commentId={firstCommentId} className={inboxItemStyles.commentRoot}>
        <div className={inboxItemStyles.nameAndTimestampWrapper}>
          <CommentCreatorName />
          <CommentTimestamp />
        </div>
        <CommentBody>
          <CommentMarkdown />
        </CommentBody>
        <CommentSeeAllRepliesButton />
      </CommentRoot>
    </div>
  );
}

function InboxItemList() {
  const context = useOptionalFilterContext();
  const threadIds = useInbox({ filter: 'open', threadIds: context, latestFirst: true });

  if (!threadIds) return <InboxEmptyState />;

  return (
    <>
      {threadIds.map((threadId) => {
        return (
          <ThreadContext.Provider value={threadId} key={`inboxThread-${threadId}`}>
            <InboxItem />
          </ThreadContext.Provider>
        );
      })}
    </>
  );
}

function InboxRoot(props: { children: React.ReactNode; threadIds?: string[] }) {
  const store = useStore();
  useEffect(() => {
    actions.subscribeInbox(store);
  }, [store]);

  return (
    <ThemeWrapper>
      <div className={styles.root}>{props.children}</div>
    </ThemeWrapper>
  );
}

const FilterContext = React.createContext<string[] | null>(null);

function useOptionalFilterContext() {
  return React.useContext(FilterContext);
}

function Inbox(props: { threadIds?: string[] }) {
  return (
    <ThemeWrapper>
      <FilterContext.Provider value={props.threadIds ?? null}>
        <InboxRoot>
          <InboxItemList />
        </InboxRoot>
      </FilterContext.Provider>
    </ThemeWrapper>
  );
}

function SidebarInbox() {
  return useIsSidebarOpen() ? (
    <Root>
      <Authenticated>
        <SidebarRoot>
          <InboxRoot>
            <SidebarHeader>
              <SidebarTitle>Comments</SidebarTitle>
              <div style={{ flex: 1 }} />
              <SidebarCloseButton />
            </SidebarHeader>
            <Scrollable>
              <InboxItemList />
            </Scrollable>
          </InboxRoot>
        </SidebarRoot>
      </Authenticated>
    </Root>
  ) : null;
}

function PopoverInbox() {
  const target = { type: 'popoverInbox' } as const;
  const popoverProps = usePopover({ target });

  return (
    <Authenticated>
      <PopoverRoot {...popoverProps} placement="bottom">
        <PopoverTrigger>
          <button>Comments</button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent>
            <div className={styles.popover}>
              <Inbox />
            </div>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </Authenticated>
  );
}

export { Inbox, InboxEmptyState, InboxRoot, InboxItem, InboxItemList, SidebarInbox, PopoverInbox };
