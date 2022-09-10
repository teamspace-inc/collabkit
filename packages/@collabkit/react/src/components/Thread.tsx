import React, { useEffect, useState } from 'react';
import { FlexCenter } from './UIKit';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { EmptyState } from './thread/EmptyState';
import { NewIndicator, useNewIndicator } from './NewIndicator';
import { styled } from '@stitches/react';
import {
  commentStyles,
  messageHeaderStyles,
  sendButtonStyles,
  threadStyles,
} from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import type { ReopenThreadButtonTarget, ThreadInfo } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { Avatar } from './Avatar';
import { ThreadContext, ThreadContextValue } from '../hooks/useThreadContext';
import { Button } from './Button';
import { ArrowUp } from './icons';
import { useComposerSendButton } from '../hooks/useComposerSendButton';
import { composerStyles } from '@collabkit/theme';
import { commentListStyles } from '@collabkit/theme';
import { getCommentType } from '../utils/getCommentType';
import { Markdown } from './Markdown';
import { Base } from './Base';

import * as Comment from './Comment';
import * as CommentList from './CommentList';
import * as Composer from './composer/Composer';

const Content = (props: React.ComponentProps<'div'>) => <div {...props} />;

const SendButtonIcon = styled(ArrowUp, sendButtonStyles.icon);
const StyledThreadRoot = styled(Base, threadStyles.root);
const StyledThreadContent = styled(Content, threadStyles.content);
const StyledHeader = styled(ThreadHeader, threadStyles.header);
const StyledHeaderTitle = styled('div', threadStyles.headerTitle);
const StyledTextOffset = styled('div', commentStyles.messageTextOffset);
const StyledCommentList = styled(CommentList.Root, commentListStyles.list);
const StyledCommentHeader = styled(Comment.Header, messageHeaderStyles.root);
const StyledCommentCreatorName = styled(Comment.CreatorName, messageHeaderStyles.name);
const StyledCommentTimestamp = styled(Comment.Timestamp, messageHeaderStyles.timestamp);
const StyledCommentRoot = styled(Comment.Root, commentStyles.root);
const StyledCommentContent = styled(Comment.Content, commentStyles.message);
const StyledCommentBody = styled(Comment.Body, commentStyles.body);

const StyledComposerRoot = styled(Composer.Root, composerStyles.root);
const StyledComposerContentEditable = styled(
  Composer.ContentEditable,
  composerStyles.contentEditable
);
const StyledComposerPlaceholder = styled('div', composerStyles.placeholder);
const StyledComposerEditor = styled(Composer.Editor, composerStyles.editorRoot);
const StyledComposerContent = styled(Composer.Content, composerStyles.content);

function ThreadHeader(props: { children?: React.ReactNode; className?: string }) {
  return <div className={props.className}>{props.children}</div>;
}

export type ThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
};

function ThreadContextProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { threadId, info, composerPrompt, showHeader, autoFocus } = props;
  const [context, setContext] = useState<ThreadContextValue | null>(null);
  const { store, theme } = useApp();
  const { userId, workspaceId } = useSnapshot(store);

  useEffect(() => {
    if (threadId && userId && workspaceId) {
      setContext({ threadId, userId, workspaceId, showHeader, composerPrompt, autoFocus, info });
    }
  }, [threadId, userId, workspaceId, showHeader, autoFocus, composerPrompt, info]);

  if (userId == null || workspaceId == null) {
    return null;
  }

  return (
    <ThreadContext.Provider value={context ?? { threadId, userId, workspaceId }}>
      <div className={theme.className} data-collabkit-internal="true" style={{ height: '100%' }}>
        {props.children}
      </div>
    </ThreadContext.Provider>
  );
}

export function Thread(props: ThreadProps & { className?: string; children?: React.ReactNode }) {
  const { store, theme } = useApp();

  const { threadId, autoFocus, composerPrompt } = props;

  const { profiles, userId, workspaceId } = useSnapshot(store);

  const { timeline, isEmpty, seenUntil, list, disabled } = useThread({
    store,
    threadId,
    workspaceId,
  });

  const newIndicatorId = useNewIndicator({ userId, timeline, seenUntil });

  const profile = userId ? profiles[userId] : null;

  const { onPointerDown } = useComposerSendButton({ workspaceId, threadId });

  return (
    <ThreadContextProvider {...props}>
      <div style={{ display: 'contents' }}>
        <StyledThreadRoot>
          <StyledThreadContent>
            {props.showHeader ? (
              <StyledHeader>
                <StyledHeaderTitle>Comments</StyledHeaderTitle>
              </StyledHeader>
            ) : null}
            {isEmpty ? <EmptyState /> : <FlexCenter />}
            {!isEmpty && (
              <ScrollableCommentList>
                <StyledCommentList>
                  {list?.map((group, i) => {
                    return group.map((event, index) => {
                      const profile = profiles[event.createdById];
                      const type = getCommentType(group, index);
                      const showProfile = type === 'default' || type === 'inline-start';
                      return profile ? (
                        <div key={event.id}>
                          {newIndicatorId === event.id ? <NewIndicator /> : null}
                          <StyledCommentRoot
                            type={type}
                            key={`event-${event.id}`}
                            eventId={event.id}
                          >
                            {profile && showProfile ? <Avatar profile={profile} /> : null}
                            <StyledCommentContent type={type} profileIndent={!showProfile}>
                              <StyledCommentHeader>
                                {showProfile ? <StyledCommentCreatorName /> : null}
                                {showProfile ? <StyledCommentTimestamp /> : null}
                              </StyledCommentHeader>
                              <StyledCommentBody>
                                <Markdown body={event.body} />
                              </StyledCommentBody>
                            </StyledCommentContent>
                          </StyledCommentRoot>
                        </div>
                      ) : null;
                    });
                  })}
                </StyledCommentList>
              </ScrollableCommentList>
            )}
            {
              <StyledComposerRoot>
                {profile ? <Avatar profile={profile} /> : null}
                <StyledComposerEditor
                  contentEditable={(props: { autoFocus?: boolean }) => (
                    <StyledComposerContent>
                      <StyledComposerContentEditable {...props} />
                    </StyledComposerContent>
                  )}
                  placeholder={
                    <StyledComposerPlaceholder>
                      {composerPrompt != null
                        ? composerPrompt
                        : isEmpty
                        ? 'Add a comment'
                        : 'Reply to this comment'}
                    </StyledComposerPlaceholder>
                  }
                  autoFocus={autoFocus}
                />
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
              </StyledComposerRoot>
            }
            <StyledTextOffset>
              <TypingIndicator />
            </StyledTextOffset>
          </StyledThreadContent>
        </StyledThreadRoot>
      </div>
    </ThreadContextProvider>
  );
}
