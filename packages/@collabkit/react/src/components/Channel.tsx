import React, { ComponentPropsWithRef, useCallback, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import * as styles from '../theme/components/Channel.css';
import { Scrollable } from './Scrollable';
import { ThemeWrapper } from './ThemeWrapper';
import { ChatCentered } from './icons';
import { emptyState } from '../theme/components/Thread.css';
import { useInbox } from '../hooks/public/useInbox';
import * as commentStyles from '../theme/components/Comment.css';
import { ThreadProvider } from './Thread';
import {
  Composer,
  ComposerButtons,
  ComposerEditor,
  ComposerPlaceholder,
  ComposerRoot,
} from './composer/Composer';
import { useThreadContext } from '../hooks/useThreadContext';
import { useWorkspaceStore } from '../hooks/useWorkspaceStore';
import { CommentList } from './CommentList';
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
  CommentEditor,
  CommentHeader,
  CommentHideIfEditing,
  CommentMarkdown,
  CommentMenu,
  CommentPin,
  CommentReactions,
  CommentRoot,
  CommentSeeAllRepliesButton,
  CommentShowIfEditing,
  CommentThreadResolveIconButton,
  CommentTimestamp,
} from './Comment';
import { ProfileAvatar } from './Profile';
import { useIsExpanded } from './useIsExpanded';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useCommentList } from '../hooks/useCommentList';

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
      (selectedId?.type === 'channel' && selectedId.threadId === threadId)
    );
  });
  const commentList = useCommentList();

  return (
    <CommentList className={styles.commentList} {...props}>
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
                  <CommentPin />
                  <CommentMarkdown />
                </CommentBody>
                <CommentReactions />
                {i == 0 && !isExpanded && !isSelected && <CommentSeeAllRepliesButton />}
              </CommentHideIfEditing>
              <CommentShowIfEditing>
                <CommentEditor />
              </CommentShowIfEditing>
            </div>
          </CommentRoot>
        )
      )}
    </CommentList>
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
      (selectedId?.type === 'channel' && selectedId.threadId === threadId)
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
            <ComposerRoot>
              <ProfileAvatar />
              <ComposerEditor
                autoFocus={true}
                placeholder={<ComposerPlaceholder>Reply</ComposerPlaceholder>}
              >
                <ComposerButtons />
              </ComposerEditor>
            </ComposerRoot>
          </div>
        ) : null}
      </div>
    </ThreadProvider>
  );
}

type ChannelProps = { channelId: string };

function ChannelRoot(props: ComponentPropsWithRef<'div'> & ChannelProps) {
  const { workspaceId } = useSnapshot(useApp().store);
  const { channelId, ...otherProps } = props;

  return workspaceId ? (
    <ThemeWrapper>
      <ChannelContext.Provider value="default">
        <div className={styles.root} {...otherProps}>
          {props.children}
        </div>
      </ChannelContext.Provider>
    </ThemeWrapper>
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
    <Scrollable autoScroll="bottom" alignToBottom={true}>
      <div className={styles.threadList} {...props}>
        {threads}
      </div>
    </Scrollable>
  );
}

// for now there is one default channel per workspace
// we may want to introduce channel ids in the future
function Channel() {
  const store = useStore();

  // we should refactor this to a simpler hasAuthenticated check we can reuse, which guarantees
  // userId and workspaceId are present, we sort of have this with UnconfiguredStore and Store
  // but we probably want an UnauthenticatedStore as well.
  // UnconfiguredStore -> UnauthenticatedStore -> Store
  // We should also look at using React.Suspense to support loading states
  // for all top level components while authentication is in progress
  const { appId, userId, workspaceId, nextThreadId } = useSnapshot(store);

  if (!appId) {
    return null;
  }

  if (!workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  useEffect(() => {
    store.nextThreadId = store.sync.nextThreadId({ appId, workspaceId });
    actions.subscribeInbox(store);
  }, [appId, workspaceId]);

  return (
    <ChannelRoot channelId="default">
      <ChannelThreadList />
      {nextThreadId ? (
        <ThreadProvider threadId={nextThreadId}>
          <div>
            <Composer isNewThread={true} />
          </div>
        </ThreadProvider>
      ) : null}
    </ChannelRoot>
  );
}

export { Channel, ChannelRoot, ChannelThreadList, ChannelThread };
