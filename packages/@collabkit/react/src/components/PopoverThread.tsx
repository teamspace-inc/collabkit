import { styled } from '@stitches/react';
import React, { forwardRef, useEffect } from 'react';
import type {
  ReopenThreadButtonTarget,
  ThreadInfo,
  ThreadResolveButtonTarget,
} from '@collabkit/core';
import * as CommentList from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import {
  commentListStyles,
  commentStyles,
  composerStyles,
  messageHeaderStyles,
  popoverThreadStyles,
  threadStyles,
} from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import { Button } from './Button';
import { Avatar } from './Avatar';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';
import { ThreadContext } from '../hooks/useThreadContext';
// import { IconButton } from './IconButton';
// import { ArrowUp, Check, X } from './icons';
import { useComposerSendButton } from '../hooks/useComposerSendButton';
import { Base } from './Base';

export const MODAL_Z_INDEX = 999999;

const Content = Base;
import * as Comment from './Comment';
import * as Composer from './composer/Composer';
import { Markdown } from './Markdown';
import { formatRelative } from 'date-fns';
import { getCommentType } from '../utils/getCommentType';
import { IconButton } from './IconButton';
import { Check } from './icons';

const StyledPopoverThreadRoot = styled(Base, popoverThreadStyles.root);
const StyledThreadContent = styled(Content, threadStyles.content);
const StyledCommentList = styled(CommentList.Root, commentListStyles.list);
const StyledCommentHeader = styled(Comment.Header, messageHeaderStyles.root, {
  flexDirection: 'row',
  gap: 12,
  lineHeight: '160%',
  alignItems: 'unset',
  padding: '0px 0px 0px',
});
const StyledCommentCreatorName = styled(Comment.CreatorName, messageHeaderStyles.name);
const StyledCommentTimestamp = styled(Comment.Timestamp, messageHeaderStyles.timestamp, {
  fontSize: '$fontSize$0',
  lineHeight: '153%',
});
const StyledCommentRoot = styled(Comment.Root, commentStyles.root, {
  padding: '16px 16px 0',
  gap: '12px',
});
const StyledCommentContent = styled(Comment.Content, commentStyles.message, {
  padding: '0px 0px 16px',
});
const StyledCommentBody = styled(Comment.Body, commentStyles.body);

const StyledComposerRoot = styled(Composer.Root, composerStyles.root, {});
const StyledComposerContentEditable = styled(
  Composer.ContentEditable,
  composerStyles.contentEditable
);
const StyledComposerPlaceholder = styled('div', composerStyles.placeholder);
const StyledComposerEditor = styled(Composer.Editor, composerStyles.editorRoot);
const StyledComposerContent = styled(Composer.Content, composerStyles.content);

type PopoverThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  autoFocus?: boolean;
  maxAvailableSize?: { width: number; height: number } | null;
};

type Handle = HTMLDivElement | null;

export const PreviewThread = forwardRef<Handle, PopoverThreadProps>(function PreviewThread(
  props: PopoverThreadProps,
  ref
) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);
  const { timeline } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const commentList = userId && workspaceId && timeline && (
    <StyledCommentList>
      {/* <div>todo render preview here</div> */}
      <div></div>
    </StyledCommentList>
  );

  return (
    <div>
      <StyledPopoverThreadRoot data-collabkit-internal="true" style={props.style} ref={ref}>
        {commentList}
      </StyledPopoverThreadRoot>
    </div>
  );
});

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { threadId } = props;
  const [context, setContext] = React.useState<{
    threadId: string;
    userId: string;
    workspaceId: string;
  } | null>(null);
  const { store, events, theme } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isResolved, isEmpty, target, list, disabled } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const profile = userId ? profiles[userId] : null;

  useEffect(() => {
    if (threadId && userId && workspaceId) {
      setContext({ threadId, userId, workspaceId });
    }
  }, [threadId, userId, workspaceId]);

  const { onPointerDown } = useComposerSendButton({ workspaceId, threadId });

  if (!workspaceId || !userId) {
    return null;
  }

  const resolveThreadTarget: ThreadResolveButtonTarget = {
    threadId,
    workspaceId,
    type: 'resolveThreadButton',
  };

  const reopenThreadTarget: ReopenThreadButtonTarget = {
    threadId,
    workspaceId,
    type: 'reopenThreadButton',
  };

  return (
    <ThreadContext.Provider value={context ?? { userId, threadId, workspaceId }}>
      <StyledPopoverThreadRoot data-collabkit-internal="true" style={props.style} ref={ref}>
        <StyledThreadContent>
          <ScrollAreaRoot>
            <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
              {isEmpty &&
                (profile ? (
                  <StyledCommentRoot style={{ padding: '16px' }}>
                    {profile ? <Avatar profile={profile} /> : null}
                    <StyledCommentHeader style={{ alignItems: 'center' }}>
                      <StyledCommentCreatorName>{profile.name}</StyledCommentCreatorName>
                    </StyledCommentHeader>
                  </StyledCommentRoot>
                ) : null)}
              {!isEmpty ? (
                <StyledCommentList>
                  {list?.map((group, i) => {
                    return group.map((event, index) => {
                      const profile = profiles[event.createdById];
                      const type = getCommentType(group, index);
                      const showProfile = type === 'default' || type === 'inline-start';
                      return profile ? (
                        <div key={event.id}>
                          <StyledCommentRoot
                            key={`event-${event.id}`}
                            style={{ paddingTop: showProfile ? '16px' : '0px' }}
                          >
                            <StyledCommentContent>
                              {showProfile ? (
                                <StyledCommentHeader>
                                  <Avatar profile={profile} />
                                  <div style={{ flex: 1 }}>
                                    {
                                      <StyledCommentCreatorName>
                                        {profile.name ?? profile.email ?? 'Anonymous'}
                                      </StyledCommentCreatorName>
                                    }
                                    {
                                      <StyledCommentTimestamp>
                                        {formatRelative(+event.createdAt, +Date.now())
                                          .replace(/yesterday at (.*)/, 'yesterday')
                                          .replace('today at', '')
                                          .replace(
                                            /(last Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) .*/,
                                            '$1'
                                          )}
                                      </StyledCommentTimestamp>
                                    }
                                  </div>
                                  {i === 0 ? (
                                    <>
                                      <IconButton
                                        // TODO: tooltip hijacks focus when used within a modal popover
                                        // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
                                        onPointerDown={(e) =>
                                          events.onPointerDown(e, {
                                            target: isResolved
                                              ? reopenThreadTarget
                                              : resolveThreadTarget,
                                          })
                                        }
                                      >
                                        {!isResolved ? (
                                          <Check
                                            size={19}
                                            weight={'thin'}
                                            color={theme.colors.neutral12.toString()}
                                          />
                                        ) : (
                                          <Check
                                            size={18}
                                            weight={'fill'}
                                            color={theme.colors.neutral12.toString()}
                                          />
                                        )}
                                      </IconButton>
                                    </>
                                  ) : null}
                                </StyledCommentHeader>
                              ) : null}
                              <StyledCommentBody>
                                <Markdown body={event.body} />
                              </StyledCommentBody>
                            </StyledCommentContent>
                          </StyledCommentRoot>
                        </div>
                      ) : null;
                    });
                  })}{' '}
                </StyledCommentList>
              ) : null}

              <StyledComposerRoot>
                {/* Some temporary styling for cashboard, we can abstract this out later */}
                <div
                  style={{
                    padding: '0px 0 16px',
                    flexDirection: 'column',
                    display: 'flex',
                    flex: 1,
                    gap: '12px',
                    alignItems: 'flex-end',
                  }}
                >
                  <StyledComposerEditor
                    contentEditable={(props: { autoFocus?: boolean }) => (
                      <StyledComposerContent>
                        <StyledComposerContentEditable {...props} />
                      </StyledComposerContent>
                    )}
                    placeholder={
                      <StyledComposerPlaceholder>
                        {props.composerPrompt != null
                          ? props.composerPrompt
                          : isEmpty
                          ? 'Add a comment'
                          : 'Reply to this comment'}
                      </StyledComposerPlaceholder>
                    }
                    autoFocus={props.autoFocus}
                  />
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                    <Button
                      type="secondary"
                      text="Cancel"
                      onPointerDown={(e) =>
                        events.onPointerDown(e, {
                          target: {
                            threadId,
                            type: 'closeThreadButton',
                            workspaceId,
                          },
                        })
                      }
                    />
                    <Button
                      type="primary"
                      disabled={disabled}
                      onPointerDown={onPointerDown}
                      text={'Comment'}
                    />
                  </div>
                </div>
              </StyledComposerRoot>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </StyledThreadContent>
      </StyledPopoverThreadRoot>
    </ThreadContext.Provider>
  );
});
