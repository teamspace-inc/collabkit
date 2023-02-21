import React, { ComponentPropsWithRef, useCallback, useEffect, useRef, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../theme/components/Channel.css';
import { Scrollable } from './Scrollable';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useInbox } from '../hooks/public/useInbox';
import * as commentStyles from '../theme/components/Comment.css';
import { ThreadProvider } from './Thread';
import {
  ComposerButtons,
  ComposerContentEditable,
  ComposerEditor,
  ComposerInput,
  ComposerPlaceholder,
  ComposerRoot,
} from './composer/Composer';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { ChannelContext, useChannelContext } from '../hooks/useChannelContext';
import { vars } from '../theme/theme/index.css';
import { useStore } from '../hooks/useStore';
import { actions } from '@collabkit/client';
import { calc } from '@vanilla-extract/css-utils';
import { useStoreKeyMatches } from '../hooks/useSubscribeStoreKey';
import {
  CommentActions,
  CommentActionsEmojiButton,
  CommentActionsReplyButton,
  CommentBody,
  CommentCreatorName,
  CommentHeader,
  CommentHideIfEditing,
  CommentMarkdown,
  CommentMenu,
  CommentReactions,
  CommentRoot,
  CommentSeeAllRepliesButton,
  CommentShowIfEditing,
  CommentThreadResolveIconButton,
  CommentTimestamp,
} from './Comment';
import { ProfileAvatar } from './Profile';
import { useIsExpanded } from '../hooks/useIsExpanded';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useCommentList } from '../hooks/useCommentList';
import { CommentPinTarget, ComposerPinButtonTarget, ComposerPinTarget } from '@collabkit/core';
import { useComposerStore } from '../hooks/useComposerStore';
import { useTarget } from '../hooks/useTarget';
import { usePinAttachment } from '../hooks/usePinAttachment';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
import { useCommentContext, useDefaultCommentContext } from '../hooks/useCommentContext';
import { useCommentSnapshot } from '../hooks/useCommentSnapshot';

import PinButtonSvg from './pin-button.svg';
import PinButtonHoverSvg from './pin-button-hover.svg';
import DeletePinButtonSvg from './delete-pin-button.svg';
import DeletePinButtonHoverSvg from './delete-pin-button-hover.svg';
import { Root } from './Root';

import CommentPinSvg from './composer/comment-pin.svg';
import CommentPinSelectedSvg from './composer/comment-pin-hover.svg';
import { Authenticated } from './Authenticated';
import { SidebarCloseButton, SidebarHeader, SidebarRoot, SidebarTitle } from './Sidebar';
import { useIsSidebarOpen } from '../hooks/useIsSidebarOpen';

function EmptyState() {
  return (
    <div className={emptyState}>
      <ChatCentered weight="thin" size={32} />
      <span>No comments yet</span>
    </div>
  );
}

function ChannelCommentList(props: ComponentPropsWithRef<'div'>) {
  const store = useStore();
  const threadId = useThreadContext();
  const isExpanded = useIsExpanded();
  const isSelected = useStoreKeyMatches(store, 'selectedId', (selectedId) => {
    return (
      (selectedId?.type === 'thread' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'pin' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'comment' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'channel' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'commentPin' && selectedId.threadId === threadId)
    );
  });
  const commentList = useCommentList();

  return (
    <div className={styles.commentList} {...props}>
      <div style={{ flex: 1 }}></div>
      {commentList.map((comment, i) =>
        !isExpanded && !isSelected && i > 0 ? null : (
          <CommentRoot
            commentId={comment.id}
            indent={i > 0}
            key={`comment-${comment.id}-${i}`}
            className={`${commentStyles.root({ indent: i > 0 })}`}
          >
            <ProfileAvatar />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CommentHideIfEditing>
                <CommentHeader>
                  <CommentCreatorName />
                  <CommentTimestamp />
                </CommentHeader>
                <CommentActions>
                  <CommentActionsEmojiButton />
                  {i == 0 && <CommentActionsReplyButton />}
                  {i == 0 && <CommentThreadResolveIconButton />}
                  <CommentMenu />
                </CommentActions>
                <CommentBody>
                  <ChannelCommentPin />
                  <CommentMarkdown />
                </CommentBody>
                <CommentReactions />
                {i == 0 && !isExpanded && !isSelected && <CommentSeeAllRepliesButton />}
              </CommentHideIfEditing>
              <CommentShowIfEditing>
                <ChannelCommentEditor />
              </CommentShowIfEditing>
            </div>
          </CommentRoot>
        )
      )}
    </div>
  );
}

function ChannelCommentEditor(props: React.ComponentProps<'div'>) {
  const { body } = useCommentSnapshot();

  return (
    <ComposerRoot
      data-testid="collabkit-comment-composer-root"
      className={styles.commentEditorRoot}
      {...props}
    >
      <ComposerEditor className={styles.composerEditor}>
        <ChannelComposerPinButton />
        <ComposerInput
          autoFocus={true}
          initialBody={body}
          placeholder={<span />}
          contentEditable={<ComposerContentEditable className={styles.composerContentEditable} />}
        />
        <div />
        <ComposerButtons />
      </ComposerEditor>
    </ComposerRoot>
  );
}

function ChannelThread() {
  const { events } = useApp();
  const threadId = useThreadContext();
  const store = useStore();
  const channelId = useChannelContext();
  const workspaceId = useWorkspaceContext();
  const workspace = useSnapshot(useWorkspaceStore());
  const { expandedThreadIds } = useSnapshot(store);
  const timeline = workspace.timeline[threadId];
  const { isResolved } = workspace.computed[threadId];

  const isSelected = useStoreKeyMatches(store, 'selectedId', (selectedId) => {
    return (
      (selectedId?.type === 'thread' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'pin' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'comment' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'channel' && selectedId.threadId === threadId) ||
      (selectedId?.type === 'commentPin' && selectedId.threadId === threadId)
    );
  });

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      events.onClick(e, {
        target: {
          type: 'channel',
          threadId,
          workspaceId,
          channelId,
        },
      });
    },
    [threadId, workspaceId, channelId]
  );

  if (!timeline) {
    return null;
  }

  if (isResolved) {
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

  // const active = !!(viewingId && viewingId.type === 'thread' && viewingId.threadId === threadId);
  const isExpanded = expandedThreadIds.includes(threadId);

  const composer = (
    <ComposerRoot className={styles.threadComposerRoot}>
      <ProfileAvatar />
      <ComposerEditor className={styles.composerEditor}>
        <ChannelComposerPinButton />
        <ComposerInput
          autoFocus={true}
          contentEditable={<ComposerContentEditable className={styles.composerContentEditable} />}
          placeholder={
            <ComposerPlaceholder className={styles.composerPlaceholder}>
              {'Reply'}
            </ComposerPlaceholder>
          }
        />
        <ComposerButtons />
      </ComposerEditor>
    </ComposerRoot>
  );

  return (
    <ThreadProvider threadId={threadId} key={`channelThread-${threadId}`} placeholder="Reply">
      <div className={styles.thread({ isSelected })} onClick={onClick}>
        <ChannelCommentList />
        {isExpanded || isSelected ? (
          <div
            style={{
              paddingLeft: `${calc.multiply(vars.space[1], 9)}`,
              paddingBottom: vars.space[2],
            }}
          >
            {composer}
          </div>
        ) : null}
      </div>
    </ThreadProvider>
  );
}

type ChannelProps = { channelId: string };

function ChannelRoot(props: ComponentPropsWithRef<'div'> & ChannelProps) {
  const store = useStore();
  const { workspaceId } = useSnapshot(store);
  const { channelId, ...otherProps } = props;

  return workspaceId ? (
    <ChannelContext.Provider value="default">
      <div className={styles.root} {...otherProps}>
        {props.children}
      </div>
    </ChannelContext.Provider>
  ) : null;
}

function ChannelThreadList(props: ComponentPropsWithRef<'div'>) {
  const threadIds = useInbox({ filter: 'open', direction: 'asc' });
  const threads = threadIds.map((threadId) => {
    return (
      <ThreadProvider threadId={threadId} key={`inboxThread-${threadId}`}>
        <ChannelThread />
      </ThreadProvider>
    );
  });

  return threadIds.length === 0 ? (
    <EmptyState />
  ) : (
    <div className={styles.threadList} {...props}>
      {threads}
    </div>
  );
}

type ComposerButtonState =
  | 'pin-default'
  | 'pin-hover'
  | 'pin-selecting'
  | 'empty-default'
  | 'empty-hover'
  | 'empty-selecting';

// we could just use one icon with svg edits, this was quicker
const COMPOSER_PIN_ICONS: { [state: string]: React.ReactElement } = {
  'pin-default': <img src={DeletePinButtonSvg} />,
  'pin-hover': <img src={DeletePinButtonHoverSvg} />,
  'pin-selecting': <img src={PinButtonHoverSvg} />,
  'empty-default': <img src={PinButtonSvg} />,
  'empty-hover': <img src={PinButtonHoverSvg} />,
  'empty-selecting': <img src={PinButtonHoverSvg} />,
};

const COMPOSER_PIN_TOOLTIPS: { [state: string]: string | null } = {
  'pin-default': 'Remove pin',
  'pin-hover': 'Remove pin',
  'pin-selecting': 'Remove pin',
  'empty-default': 'Annotate',
  'empty-hover': 'Annotate',
  'empty-selecting': null,
};

function ChannelComposerPinButton(props: { className?: string }) {
  const { events, store } = useApp();
  const { uiState } = useSnapshot(store);
  const workspaceId = useWorkspaceContext();
  const eventId = useDefaultCommentContext();
  const threadId = useThreadContext();
  const pin = usePinAttachment(useComposerStore());
  const ref = useRef(null);
  const composerTarget = useTarget();
  const isHovering = useStoreKeyMatches(store, 'hoveringId', (hoveringId) => {
    return (
      hoveringId?.type === 'composerPinButton' &&
      hoveringId.eventId === eventId &&
      hoveringId.threadId === threadId &&
      hoveringId.workspaceId === workspaceId
    );
  });

  const isActive = useStoreKeyMatches(store, 'composerId', (composerId) => {
    return (
      composerId?.type === 'composer' &&
      composerId.eventId === eventId &&
      composerId.threadId === threadId &&
      composerId.workspaceId === workspaceId
    );
  });

  const state = ((pin ? 'pin' : 'empty') +
    '-' +
    (isActive && uiState === 'selecting'
      ? 'selecting'
      : isHovering
      ? 'hover'
      : 'default')) as ComposerButtonState;

  const icon = React.cloneElement(COMPOSER_PIN_ICONS[state], {
    style: { position: 'relative', top: '0px', width: '16px', height: '16px' },
  });

  if (composerTarget.type !== 'composer') {
    return null;
  }

  const target: ComposerPinButtonTarget | ComposerPinTarget | null = pin
    ? ({
        type: 'composerPin',
        workspaceId,
        threadId,
        eventId,
        objectId: pin.objectId,
        pinId: pin.id,
      } as const)
    : ({
        type: 'composerPinButton',
        workspaceId,
        threadId,
        eventId,
      } as const);

  const tooltip = COMPOSER_PIN_TOOLTIPS[state];

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => events.onMouseEnter(e, { target })}
      onMouseLeave={(e) => events.onMouseLeave(e, { target })}
      className={styles.composerPinButton}
      onClick={(e) => events.onClick(e, { target })}
      data-testid="collabkit-composer-pin-button"
      {...props}
    >
      <Tooltip>
        <TooltipTrigger>{icon}</TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </div>
  );
}

function ChannelCommentPin(props: React.ComponentProps<'img'>) {
  const threadId = useThreadContext();
  const eventId = useCommentContext();
  const workspaceId = useWorkspaceContext();
  const { events } = useApp();
  const { attachments } = useCommentSnapshot();
  const pinId = attachments
    ? Object.keys(attachments).find((id) => attachments[id].type === 'pin')
    : null;
  const pin = pinId ? { id: pinId, ...attachments![pinId] } : null;

  const store = useStore();

  const target: CommentPinTarget | null = useMemo(
    () =>
      pin
        ? {
            type: 'commentPin',
            threadId,
            eventId,
            workspaceId,
            objectId: pin.objectId,
            id: pin.id,
          }
        : null,
    [pin]
  );

  const isSelected = useStoreKeyMatches(
    store,
    'selectedId',
    (selectedId) =>
      (selectedId?.type === 'pin' || selectedId?.type === 'commentPin') && selectedId.id === pinId
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      target &&
        events.onClick(e, {
          target,
        });
    },
    [target]
  );

  if (!pin) {
    return null;
  }

  return (
    <span
      className={styles.commentPin}
      data-testid="collabkit-comment-pin"
      {...props}
      onClick={onClick}
    >
      <Tooltip>
        <TooltipTrigger>
          <img
            className={styles.commentPin}
            onClick={onClick}
            // todo preload or inline these images to avoid loading jank
            src={isSelected ? CommentPinSelectedSvg : CommentPinSvg}
            {...props}
          />
        </TooltipTrigger>
        <TooltipContent>View annotation</TooltipContent>
      </Tooltip>
    </span>
  );
}

function ChannelNewThreadComposer() {
  const store = useStore();
  const { appId, workspaceId, nextThreadId } = useSnapshot(store);

  useEffect(() => {
    if (!appId || !workspaceId) {
      return;
    }
    store.nextThreadId = store.sync.nextThreadId({ appId, workspaceId });
    actions.subscribeInbox(store);
  }, [appId, workspaceId]);

  return nextThreadId ? (
    <ThreadContext.Provider value={nextThreadId}>
      <ComposerRoot className={styles.rootComposerRoot} isNewThread={true}>
        <ProfileAvatar />
        <ComposerEditor className={styles.composerEditor}>
          <ChannelComposerPinButton />
          <ComposerInput
            autoFocus={false}
            contentEditable={<ComposerContentEditable className={styles.composerContentEditable} />}
            placeholder={
              <ComposerPlaceholder className={styles.composerPlaceholder}>
                Add a comment
              </ComposerPlaceholder>
            }
          />
        </ComposerEditor>
      </ComposerRoot>
    </ThreadContext.Provider>
  ) : null;
}

// for now there is one default channel per workspace
// we may want to introduce channel ids in the future
// so we can have full Slack style channels which are a
// collection of threads
function Channel() {
  return (
    <Root>
      <Authenticated>
        <ChannelRoot channelId="default">
          <div id="sidebar-header-portal" />
          <h1>Comments</h1>
          <Scrollable autoScroll="bottom" alignToBottom={true}>
            <ChannelThreadList />
          </Scrollable>
          <ChannelNewThreadComposer />
        </ChannelRoot>
      </Authenticated>
    </Root>
  );
}

function SidebarChannel() {
  return useIsSidebarOpen() ? (
    <Root>
      <Authenticated>
        <SidebarRoot>
          <ChannelRoot channelId="default">
            <div id="sidebar-header-portal" />
            <SidebarHeader>
              <SidebarTitle>Comments</SidebarTitle>
              <div style={{ flex: 1 }} />
              <SidebarCloseButton />
            </SidebarHeader>
            <Scrollable autoScroll="bottom" alignToBottom={true}>
              <ChannelThreadList />
            </Scrollable>
            <ChannelNewThreadComposer />
          </ChannelRoot>
        </SidebarRoot>
      </Authenticated>
    </Root>
  ) : null;
}

export { Channel, ChannelRoot, ChannelThreadList, ChannelThread, SidebarChannel };
