import React, { useEffect, useState } from 'react';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { NewIndicator, useNewIndicator } from './NewIndicator';
import { useSnapshot } from 'valtio';
import type { ThreadInfo } from '@collabkit/core';
import { TypingIndicator } from './TypingIndicator';
import { ThreadContext, ThreadContextValue } from '../hooks/useThreadContext';
import { getCommentType } from '../utils/getCommentType';
import * as Profile from './Profile';
import * as Comment from './Comment';
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
};

function ThreadContextProvider(props: ThreadProps & { children: React.ReactNode }) {
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
                <div className={styles.commentList}>
                  {list?.map((group) => {
                    return group.map((event, index) => {
                      const showProfile = index === 0;
                      return (
                        <React.Fragment key={event.id}>
                          {newIndicatorId === event.id ? <NewIndicator /> : null}
                          <Comment.Root eventId={event.id} type={getCommentType(group, index)}>
                            {showProfile && <Profile.Avatar />}
                            <Comment.Content profileIndent={!showProfile}>
                              {showProfile && (
                                <Comment.Header>
                                  <Comment.CreatorName />
                                  <Comment.Timestamp />
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
            <Composer.Root className={styles.composer}>
              <Profile.Avatar />
              <Composer.Editor
                contentEditable={(props) => <Composer.ContentEditable {...props} />}
                placeholder={<Composer.Placeholder>Write a comment</Composer.Placeholder>}
                autoFocus={props.autoFocus}
              />
              <TypingIndicator className={styles.typingIndicator} />
            </Composer.Root>
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
