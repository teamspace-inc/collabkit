import React from 'react';
import { useSnapshot } from 'valtio';
import {
  StyledInboxThreadRoot,
  StyledInboxThreadContent,
  StyledUnreadDot,
  StyledCommentCreatorName,
  StyledTimestamp,
  StyledCommentBody,
  StyledReplyCount,
} from './Inbox';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { ResolveThreadButton } from './ResolveThreadButton';
import { ThreadCommentersFacepile } from './ThreadCommentersFacepile';
import { useInboxStore } from './useInboxStore';
import { useWorkspaceStore } from './useWorkspaceStore';
import { useReplyCount } from './useReplyCount';

import { useApp } from '../hooks/useApp';

import * as Comment from './Comment';

export function InboxItem() {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store } = useApp();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const timeline = workspace.timeline[threadId];
  const replyCount = useReplyCount();

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

  // inbox tracks most recent comment by default
  const lastComment = inbox[threadId];

  return (
    <ThreadContext.Provider
      value={{ threadId, workspaceId, userId }}
      key={`inboxThread-${threadId}`}
    >
      <StyledInboxThreadRoot
        onClick={() => {
          store.callbacks?.onInboxThreadClick?.({ threadId, userId, workspaceId });
        }}
      >
        <StyledInboxThreadContent>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <StyledUnreadDot />
            <ThreadCommentersFacepile />
            <div style={{ flex: 1 }}></div>
            <ResolveThreadButton />
          </div>
          <div style={{ padding: '12px 20px', background: '#eee' }}>Cell data placeholder</div>
          <Comment.Root eventId={firstCommentId}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <StyledCommentCreatorName />
                <StyledTimestamp timestamp={+lastComment?.createdAt} />
              </div>
              <StyledCommentBody />
            </div>
          </Comment.Root>
          <Comment.Root eventId={lastComment.id}>
            {replyCount > 0 ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <StyledReplyCount />
                <StyledTimestamp timestamp={+lastComment?.createdAt} />
              </div>
            ) : null}
          </Comment.Root>
        </StyledInboxThreadContent>
      </StyledInboxThreadRoot>
    </ThreadContext.Provider>
  );
}
