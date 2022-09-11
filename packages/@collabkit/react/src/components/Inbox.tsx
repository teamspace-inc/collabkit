import { actions } from '@collabkit/client';
import { styled } from '@stitches/react';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { ThreadContext } from '../hooks/useThreadContext';
import { Base } from './Base';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';
import { IconButton } from './IconButton';
import { X } from './icons';
import { InboxItem } from './InboxItem';
import { useOptionalUserContext } from '../hooks/useUserContext';
import { timelineUtils } from '@collabkit/core';

export function unique<T>(value: T, index: number, self: T[]) {
  return self.indexOf(value) === index;
}

const InboxThread = {
  Root: Base,
  Content: Base,
  Facepile: Base,
  UnreadIndicator: Base,
  CommentBody: Base,
  CommentProfile: Base,
};

export const StyledInboxThreadRoot = styled(InboxThread.Root, {
  display: 'flex',
  borderBottom: '1px solid #E3E9ED',
  flexDirection: 'column',
});

export const StyledInboxThreadContent = styled(InboxThread.Content, {
  background: 'white',
  padding: '32px 24px',
  display: 'flex',
  gap: '16px',
  flexDirection: 'column',
  '&:hover': {
    background: '#E3E9ED',
  },
});

const Root = (props: React.ComponentProps<'div'>) => <div {...props} />;
const Sidebar = (props: React.ComponentProps<'div'>) => <div {...props} />;

const StyledSidebar = styled(Sidebar, {
  boxSizing: 'border-box',
  height: '100%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
});

const StyledRoot = styled(Root, {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxSizing: 'border-box',
  height: '100%',
  borderRadius: 0,
});

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  specialProp?: string;
}

function CloseSidebarButton() {
  const { store } = useApp();
  const userContext = useOptionalUserContext();

  return (
    <IconButton
      onPointerDown={() =>
        userContext ? store.callbacks?.onInboxCloseButtonClick?.(userContext) : null
      }
    >
      <X></X>
    </IconButton>
  );
}

const SidebarTitle = styled('h1', {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  lineHeight: '153%',
  letterSpacing: -0.25,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  padding: '22px 24px',
  borderBottom: '1px solid #E3E9ED',
});

const EmptyState = {
  Root: Base,
  Title: Base,
  Body: Base,
};

const StyledEmptyStateRoot = styled(EmptyState.Root, {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  gap: '11px',
});

const StyledEmptyStateTitle = styled(EmptyState.Title, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 24,
  lineHeight: '135%',
  textAlign: 'center',
  letterSpacing: -0.1,
  color: '#6A7278',
});

const StyledEmptyStateBody = styled(EmptyState.Body, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '160%',
  textAlign: 'center',
  letterSpacing: -0.1,
  color: '#6A7278',
});

export function Inbox() {
  const { store, theme } = useApp();
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
    <StyledSidebar>
      <SidebarTitle>
        <div style={{ flex: 1 }}>All Comments</div>
        <CloseSidebarButton />
      </SidebarTitle>
      <StyledRoot className={theme.className}>
        {isEmpty ? (
          <StyledEmptyStateRoot>
            <StyledEmptyStateTitle>No comments</StyledEmptyStateTitle>
            <StyledEmptyStateBody>Comments on this view will appear here.</StyledEmptyStateBody>
          </StyledEmptyStateRoot>
        ) : (
          <ScrollAreaRoot>
            <ScrollAreaViewport>
              {/* custom styling for cashboard */}
              <div style={{ height: 'calc(100% - 77px)' }}>{inboxItems}</div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        )}
      </StyledRoot>
    </StyledSidebar>
  );
}
