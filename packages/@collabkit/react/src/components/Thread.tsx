import React, { useMemo } from 'react';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { NewIndicator, useNewIndicator } from './NewIndicator';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { ThreadContext } from '../hooks/useThreadContext';
import { getCommentType } from '../utils/getCommentType';
import Profile from './Profile';
import Comment from './Comment';
import * as Composer from './composer/Composer';
import { ThemeWrapper } from './ThemeWrapper';
import * as styles from '../styles/components/Thread.css';
import { ChatCentered } from './icons';

export type ThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
};

export function ThreadProvider(props: ThreadProps & { children: React.ReactNode }) {
  const { store } = useApp();
  const { userId, workspaceId } = useSnapshot(store);
  const { threadId } = props;

  console.log('ThreadProvider', { threadId, userId, workspaceId });

  if (userId == null || workspaceId == null) {
    return null;
  }

  const value = useMemo(
    () => ({
      threadId,
      workspaceId,
      userId,
    }),
    [threadId, workspaceId, userId]
  );

  return <ThreadContext.Provider value={value}>{props.children}</ThreadContext.Provider>;
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
    <ThreadProvider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <div className={styles.root}>
            {props.showHeader && <div className={styles.header}>Comments</div>}
            {isEmpty ? (
              <EmptyState />
            ) : (
              <ScrollableCommentList>
                <div className={styles.commentList}>
                  {list?.map((group) => {
                    return group.map((event, index) => {
                      const showProfile = index === 0;
                      return (
                        <React.Fragment key={event.id}>
                          {newIndicatorId === event.id ? <NewIndicator /> : null}
                          <Comment.Root commentId={event.id} type={getCommentType(group, index)}>
                            {showProfile && <Profile.Avatar />}
                            <Comment.Content profileIndent={!showProfile}>
                              {showProfile && (
                                <Comment.Header>
                                  <div
                                    style={{
                                      gap: '8px',
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'baseline',
                                    }}
                                  >
                                    <Comment.CreatorName />
                                    <Comment.Timestamp />
                                  </div>
                                </Comment.Header>
                              )}
                              <Comment.Body />
                            </Comment.Content>
                          </Comment.Root>
                        </React.Fragment>
                      );
                    });
                  })}
                </div>
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
    </ThreadProvider>
  );
}

Thread.Provider = ThreadProvider;

const emptyState = (
  <div className={styles.emptyState}>
    <ChatCentered weight="thin" size={32} />
    <span>No comments yet</span>
  </div>
);

export function EmptyState() {
  return emptyState;
}
