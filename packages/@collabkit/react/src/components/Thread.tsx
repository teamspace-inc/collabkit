import { FlexCenter } from './UIKit';
import React, { useEffect, useState } from 'react';
import { Composer } from './composer/Composer';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { EmptyState } from './thread/EmptyState';
import { useNewIndicator } from './NewIndicator';
import { styled } from '@stitches/react';
import { commentStyles, threadStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { ComposerEditor } from './composer/ComposerEditor';
import { Avatar } from './Avatar';
import { CommentList } from './CommentList';
import { ThreadContext } from '../hooks/useThreadContext';
import { ComposerSendButton } from './composer/ComposerSendButton';

const StyledMessageTextOffset = styled('div', commentStyles.messageTextOffset);

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
  const [context, setContext] = useState<{
    threadId: string;
  } | null>(null);
  const { store, theme } = useApp();

  const { userId, workspaceId, workspaces, profiles } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;

  const { timeline, isEmpty, seenUntil } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const newIndicatorId = useNewIndicator({ userId, timeline, seenUntil });

  const shouldRenderEmptyState = isEmpty || !workspace?.likelyFetchedAllProfiles;

  const canRenderCommentList = !isEmpty && workspace?.likelyFetchedAllProfiles && timeline;

  useEffect(() => {
    if (threadId) {
      setContext({ threadId });
    }
  }, [threadId]);

  if (!userId || !workspaceId) {
    return null;
  }

  const profile = profiles[userId];

  return (
    <ThreadContext.Provider value={context}>
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
                  timeline={timeline}
                  newIndicatorId={newIndicatorId}
                />
              </ScrollableCommentList>
            )}
            {
              <Composer>
                {profile ? <Avatar profile={profile} /> : null}
                <ComposerEditor
                  placeholder={
                    props.composerPrompt != null
                      ? props.composerPrompt
                      : isEmpty
                      ? 'Add a comment'
                      : 'Reply to this comment'
                  }
                  autoFocus={props.autoFocus}
                />
                <ComposerSendButton />
              </Composer>
            }
            <StyledMessageTextOffset>
              <TypingIndicator />
            </StyledMessageTextOffset>
          </StyledThread>
        </StyledThreadContainer>
      </div>
    </ThreadContext.Provider>
  );
}
