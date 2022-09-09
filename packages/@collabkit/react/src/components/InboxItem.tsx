import React from 'react';
import { useSnapshot } from 'valtio';
import { StyledInboxThreadRoot, StyledInboxThreadContent } from './Inbox';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { ResolveThreadButton } from './ResolveThreadButton';
import { ThreadCommentersFacepile } from './ThreadCommentersFacepile';
import { useInboxStore } from '../hooks/useInboxStore';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { useReplyCount } from '../hooks/useReplyCount';

import { useApp } from '../hooks/useApp';

import * as Comment from './Comment';
import { styled } from '@stitches/react';
import { ReplyCount } from './ReplyCount';
import { UnreadDot } from './UnreadDot';

import { commentStyles } from '@collabkit/theme';
import { computeIsResolved } from '../utils/computeIsResolved';

export const StyledReplyCount = styled(ReplyCount, {
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#2C915E',
});

export const StyledCommentCreatorName = styled(Comment.CreatorName, {
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#000000',
});

export const StyledUnreadDot = styled(UnreadDot, {
  width: 8,
  height: 8,
  borderRadius: 8,
  background: '#007FF5',
  position: 'absolute',
  left: -16,
});

export const StyledCommentTimestamp = styled(Comment.Timestamp, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#6A7278',
});

export const StyledCommentBody = styled(Comment.Body, commentStyles.markdown);

export function InboxItem() {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { store, renderThreadContextPreview } = useApp();
  const workspace = useSnapshot(useWorkspaceStore());
  const inbox = useSnapshot(useInboxStore());
  const timeline = workspace.timeline[threadId];
  const info = workspace.threadInfo[threadId];
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

  const isResolved = computeIsResolved(timeline);

  return isResolved ? null : (
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
          {renderThreadContextPreview?.({ threadId, workspaceId, userId, info })}
          <Comment.Root eventId={firstCommentId}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <StyledCommentCreatorName />
                <StyledCommentTimestamp />
              </div>
              <StyledCommentBody />
            </div>
          </Comment.Root>
          <Comment.Root eventId={lastComment.id}>
            {/* {replyCount > 0 ? (
              <>
                <div>Foo</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <StyledReplyCount />
                  <StyledCommentTimestamp />
                </div>
              </>
            ) : (
              <div>FooBaz</div>
            )} */}
          </Comment.Root>
        </StyledInboxThreadContent>
      </StyledInboxThreadRoot>
    </ThreadContext.Provider>
  );
}
