import { FlexCenter } from './UIKit';
import React, { useEffect, useState } from 'react';
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
import { ThreadContext } from '../hooks/useThreadContext';
import { ComposerSendButton } from './composer/ComposerSendButton';
import { Button } from './Button';
import { ArrowUp } from './icons';

const SendButtonIcon = styled(ArrowUp, sendButtonStyles.icon);

const Root = styled('div', threadStyles.root);
const Content = styled('div', threadStyles.content);
const Header = styled('div', threadStyles.header);
const HeaderTitle = styled('div', threadStyles.headerTitle);
const TextOffset = styled('div', commentStyles.messageTextOffset);

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
    userId: string;
    workspaceId: string;
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
    if (threadId && userId && workspaceId) {
      setContext({ threadId, userId, workspaceId });
    }
  }, [threadId, userId, workspaceId]);

  // render dummy thread here
  if (userId == null || workspaceId == null) {
    return null;
  }

  const profile = profiles[userId];

  return (
    <ThreadContext.Provider value={context ?? { threadId, userId, workspaceId }}>
      <Root className={theme.className} style={props.style} data-collabkit-internal="true">
        <Content>
          {props.showHeader ? (
            <Header>
              <HeaderTitle>Comments</HeaderTitle>
            </Header>
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
              <ComposerSendButton
                renderButton={({ disabled, onPointerDown }) => (
                  <Button
                    onPointerDown={onPointerDown}
                    type="primary"
                    icon={
                      <SendButtonIcon
                        size={13}
                        color={theme.colors.composerButtonIconColor.toString()}
                        weight="bold"
                      />
                    }
                    disabled={disabled}
                  />
                )}
              />
            </Composer>
          }
          <TextOffset>
            <TypingIndicator />
          </TextOffset>
        </Content>
      </Root>
    </ThreadContext.Provider>
  );
}
