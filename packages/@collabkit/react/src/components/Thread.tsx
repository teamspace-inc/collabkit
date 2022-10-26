import React, { useEffect, useState } from 'react';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { NewIndicator, useNewIndicator } from './NewIndicator';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { ThreadContext, ThreadContextValue } from '../hooks/useThreadContext';
import * as Profile from './Profile';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../styles/components/Thread.css';
import { ChatCentered } from './icons';
import * as CommentList from './CommentList';

export type ThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
};

export function ThreadContextProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { threadId, info, composerPrompt, showHeader, autoFocus } = props;
  const [context, setContext] = useState<ThreadContextValue | null>(null);
  const { store } = useApp();
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
      {props.children}
    </ThreadContext.Provider>
  );
}

export function Thread(props: ThreadProps & { className?: string; children?: React.ReactNode }) {
  const { threadId } = props;
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);
  const { timeline, isEmpty, seenUntil, list } = useThread({
    store,
    threadId,
    workspaceId,
  });
  const newIndicatorId = useNewIndicator({ userId, timeline, seenUntil });

  if (!userId) {
    return null;
  }

  return (
    <ThreadContextProvider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <div className={styles.root}>
            {props.showHeader && <div className={styles.header}>Comments</div>}
            {isEmpty ? (
              <EmptyState />
            ) : (
              <ScrollableCommentList>
                <CommentList.Root>
                  {list?.map((group, gi) => {
                    const groupedComments = group.map((event, index) => {
                      const showProfile = index === 0;
                      return (
                        <React.Fragment key={event.id}>
                          {newIndicatorId === event.id ? <NewIndicator /> : null}
                          <Comment.Root eventId={event.id}>
                            {showProfile && <Profile.Avatar />}
                            <Comment.Content profileIndent={!showProfile}>
                              {showProfile && (
                                <Comment.Header>
                                  <Comment.NameAndTimestampWrapper>
                                    <Comment.CreatorName />
                                    <Comment.Timestamp />
                                  </Comment.NameAndTimestampWrapper>
                                </Comment.Header>
                              )}
                              <Comment.Body />
                            </Comment.Content>
                          </Comment.Root>
                        </React.Fragment>
                      );
                    });
                    return groupedComments ? <div key={gi}>{groupedComments}</div> : null;
                  })}
                </CommentList.Root>
              </ScrollableCommentList>
            )}
            {props.hideComposer ? null : (
              <Composer.Root className={styles.composer} autoFocus={props.autoFocus ?? true}>
                <Profile.Avatar />
                <Composer.Editor
                  contentEditable={<Composer.ContentEditable />}
                  placeholder={<Composer.Placeholder>Write a comment</Composer.Placeholder>}
                />
                <TypingIndicator className={styles.typingIndicator} />
              </Composer.Root>
            )}
          </div>
        </ThemeWrapper>
      </Profile.Provider>
    </ThreadContextProvider>
  );
}

const emptyState = (
  <div className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

export function EmptyState() {
  return emptyState;
}
