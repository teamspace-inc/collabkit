import { FlexCenter } from './UIKit';
import React from 'react';
import { Composer } from './composer/Composer';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { EmptyState } from './thread/EmptyState';
import { useNewIndicator } from './NewIndicator';
import { styled } from '@stitches/react';
import { commentStyles, sendButtonStyles, threadStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { ComposerEditor } from './composer/ComposerEditor';
import { Avatar } from './Avatar';
import { CommentList } from './CommentList';
import { Button } from './Button';
import { ArrowUp } from './icons';

const StyledMessageTextOffset = styled('div', commentStyles.messageTextOffset);
const StyledComposerSendButtonIcon = styled(ArrowUp, sendButtonStyles.icon);

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
  const { threadId } = props;
  const { store, theme, events } = useApp();

  const { userId, workspaceId, workspaces, profiles } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const { timeline, isEmpty, seenUntil } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const newIndicatorId = useNewIndicator({ userId, timeline, seenUntil });

  const shouldRenderEmptyState = isEmpty || !workspace?.likelyFetchedAllProfiles;

  const canRenderCommentList =
    !isEmpty && workspace?.likelyFetchedAllProfiles && timeline && workspaceId;

  const canRenderComposer = workspaceId && workspace !== null;

  const composer = workspace ? workspace.composers[threadId] : null;

  const bodyLength = composer?.$$body.trim().length ?? 0;

  if (!userId) {
    return null;
  }

  const profile = profiles[userId];

  return (
    <div style={{ display: 'contents' }} className={theme.className}>
      <StyledThreadContainer
        className={theme.className}
        style={props.style}
        data-collabkit-internal="true"
      >
        <StyledThread>
          {props.showHeader ? (
            <StyledThreadHeader>
              <StyledThreadHeaderTitle>Comments</StyledThreadHeaderTitle>
            </StyledThreadHeader>
          ) : null}
          {shouldRenderEmptyState ? <EmptyState /> : <FlexCenter />}
          {canRenderCommentList && (
            <ScrollableCommentList>
              <CommentList
                seenUntil={seenUntil}
                threadId={threadId}
                userId={userId}
                workspaceId={workspaceId}
                timeline={timeline}
                newIndicatorId={newIndicatorId}
              />
            </ScrollableCommentList>
          )}
          {canRenderComposer ? (
            <Composer workspaceId={workspaceId} threadId={threadId} userId={userId}>
              {profile ? <Avatar profile={profile} /> : null}
              <ComposerEditor
                userId={userId}
                workspaceId={workspaceId}
                threadId={threadId}
                placeholder={
                  props.composerPrompt != null
                    ? props.composerPrompt
                    : isEmpty
                    ? 'Add a comment'
                    : 'Reply to this comment'
                }
                autoFocus={props.autoFocus}
              />
              <Button
                onPointerDown={(e) => {
                  events.onSend(workspaceId, threadId);
                }}
                type="primary"
                icon={
                  <StyledComposerSendButtonIcon
                    size={13}
                    color={theme.colors.composerButtonIconColor.toString()}
                    weight="bold"
                  />
                }
                disabled={bodyLength === 0}
              />
            </Composer>
          ) : null}
          <StyledMessageTextOffset>
            <TypingIndicator workspaceId={workspaceId} threadId={props.threadId} />
          </StyledMessageTextOffset>
        </StyledThread>
      </StyledThreadContainer>
    </div>
  );
}
