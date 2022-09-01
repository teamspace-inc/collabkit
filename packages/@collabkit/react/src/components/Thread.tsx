import { FlexCenter } from './UIKit';
import React from 'react';
import { Composer } from './Composer';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { EmptyState } from './thread/EmptyState';
import { useNewIndicator } from './NewIndicator';
import { styled } from '@stitches/react';
import { threadStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';

const StyledThreadContainer = styled('div', threadStyles.container);
const StyledThread = styled('div', threadStyles.thread);
const StyledThreadHeader = styled('div', threadStyles.header);
const StyledThreadHeaderTitle = styled('div', threadStyles.headerTitle);

export function Thread(props: {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { store, theme } = useApp();

  const { userId, workspaceId, workspaces, isConnected } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const { timeline, isEmpty, seenUntil } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const newIndicatorId = useNewIndicator({ userId, timeline, seenUntil });

  if (!userId) {
    return null;
  }

  return (
    <div style={{ display: 'contents' }} className={theme.className}>
      <StyledThreadContainer
        className={theme.className}
        style={props.style}
        data-collabkit-internal="true"
      >
        {/* {reactingId ? (
        <div
          onClick={(e) => (reactingId ? events.onEmojiReactionPickerModalBackgroundClick(e) : null)}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'background-color 0.2s ease-in-out',
            // zIndex: MODAL_Z_INDEX,
            pointerEvents: 'none',
            borderRadius: theme.radii['1'].toString(),
            ...(reactingId
              ? {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  pointerEvents: 'all',
                }
              : {}),
          }}
        />
      ) : null} */}
        <StyledThread>
          {props.showHeader ? (
            <StyledThreadHeader>
              <StyledThreadHeaderTitle>Comments</StyledThreadHeaderTitle>
            </StyledThreadHeader>
          ) : null}
          {!isConnected ? <FlexCenter /> : null}
          {isConnected && (isEmpty || !workspace?.likelyFetchedAllProfiles) ? <EmptyState /> : null}
          {!isEmpty && workspace?.likelyFetchedAllProfiles && timeline && workspaceId && (
            <ScrollableCommentList
              seenUntil={seenUntil}
              threadId={props.threadId}
              userId={userId}
              workspaceId={workspaceId}
              timeline={timeline}
              newIndicatorId={newIndicatorId}
            />
          )}
          {workspaceId && workspace !== null ? (
            <Composer
              autoFocus={props.autoFocus}
              placeholder={
                props.composerPrompt != null
                  ? props.composerPrompt
                  : isEmpty
                  ? 'Add a comment'
                  : 'Reply to this comment'
              }
              workspaceId={workspaceId}
              threadId={props.threadId}
              isFloating={false}
              userId={userId}
              isTyping={workspace?.composers[props.threadId]?.isTyping}
            />
          ) : null}
        </StyledThread>
      </StyledThreadContainer>
    </div>
  );
}
