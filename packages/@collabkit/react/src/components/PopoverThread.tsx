import React, { forwardRef, useEffect } from 'react';
import { ThreadInfo } from '@collabkit/core';
import * as CommentList from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { useSnapshot } from 'valtio';
import { format, isSameDay, isSameYear } from 'date-fns';
import { Button } from './Button';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';
import { ThreadContext } from '../hooks/useThreadContext';
import { useComposerSendButton } from '../hooks/useComposerSendButton';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';
import * as Profile from './Profile';
import { PopoverThreadCommentEditor } from './PopoverThreadCommentEditor';
import * as styles from '../styles/PopoverThread.css';
import { ThemeWrapper } from './ThemeWrapper';

// Cashboard exact timestamp
//
// Spec:
// Display the time and date of the comment as HH:MM [AM/PM] Jun 23.
// Display “Today” if the comment date is the current date.
// Display the year (“June 23, 2021”) if the comment date is not the current year.
function formatTimestampExact(timestamp: number, currentTimestamp: number) {
  if (isSameDay(timestamp, currentTimestamp)) {
    return format(timestamp, "p 'Today'");
  }
  if (isSameYear(timestamp, currentTimestamp)) {
    return format(timestamp, 'p MMM d');
  }
  return format(timestamp, 'p MMM d, yyyy');
}

type PopoverThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  maxAvailableSize?: { width: number; height: number } | null;
};

type Handle = HTMLDivElement | null;

export const PreviewThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { threadId } = props;
  const [context, setContext] = React.useState<{
    threadId: string;
    userId: string;
    workspaceId: string;
  } | null>(null);
  const { store } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty, messageEvents } = useThread({
    ...props,
    store,
    workspaceId,
  });

  useEffect(() => {
    if (threadId && userId && workspaceId) {
      setContext({ threadId, userId, workspaceId });
    }
  }, [threadId, userId, workspaceId]);

  const event = messageEvents?.[0];
  const profile = event && profiles[event?.createdById];
  if (!workspaceId || !userId || !event || !profile || isEmpty) {
    return null;
  }

  return (
    <ThreadContext.Provider value={context ?? { userId, threadId, workspaceId }}>
      <ThemeWrapper>
        <div className={styles.root} data-collabkit-internal="true" style={props.style} ref={ref}>
          <ScrollAreaRoot>
            <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
              <CommentList.Root className={styles.commentList}>
                <Comment.Root
                  className={styles.comment}
                  eventId={event.id}
                  style={{ paddingTop: '16px' }}
                >
                  <Comment.Content>
                    <Comment.Header className={styles.commentHeader}>
                      <Profile.Avatar />
                      <Comment.NameAndTimestampWrapper>
                        <Comment.CreatorName />
                        <Comment.Timestamp format={formatTimestampExact} />
                      </Comment.NameAndTimestampWrapper>
                    </Comment.Header>
                    <Comment.Body />
                  </Comment.Content>
                </Comment.Root>
              </CommentList.Root>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      </ThemeWrapper>
    </ThreadContext.Provider>
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
  const { store, events } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty, list, disabled } = useThread({
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

  return (
    <ThreadContext.Provider value={context ?? { userId, threadId, workspaceId }}>
      <ThemeWrapper>
        <div className={styles.root} data-collabkit-internal="true" style={props.style} ref={ref}>
          <ScrollAreaRoot>
            <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
              {isEmpty &&
                (profile ? (
                  <div
                    style={{
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Profile.Provider profileId={userId}>
                      <Profile.Avatar />
                      <Profile.Name />
                    </Profile.Provider>
                  </div>
                ) : null)}
              {!isEmpty && list ? (
                <CommentList.Root className={styles.commentList}>
                  {list.map((group, i) =>
                    group.map((event) => (
                      <Comment.Root className={styles.comment} eventId={event.id} key={event.id}>
                        <Comment.Content>
                          <Comment.Header className={styles.commentHeader}>
                            <Profile.Avatar />
                            <Comment.NameAndTimestampWrapper>
                              <Comment.CreatorName />
                              <Comment.Timestamp format={formatTimestampExact} />
                            </Comment.NameAndTimestampWrapper>
                            <Comment.Menu />
                          </Comment.Header>
                          <Comment.Body />
                          <PopoverThreadCommentEditor />
                        </Comment.Content>
                      </Comment.Root>
                    ))
                  )}
                </CommentList.Root>
              ) : null}

              <Composer.Root className={styles.composer}>
                <Composer.Editor
                  contentEditable={(props: { autoFocus?: boolean }) => (
                    <Composer.ContentEditable {...props} />
                  )}
                  placeholder={
                    <Composer.Placeholder>
                      {isEmpty ? 'Add a comment' : 'Reply to this comment'}
                    </Composer.Placeholder>
                  }
                  autoFocus={props.autoFocus}
                />
              </Composer.Root>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  padding: '0 16px 16px',
                  justifyContent: 'flex-end',
                }}
              >
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
                  text="Comment"
                  disabled={disabled}
                  onPointerDown={onPointerDown}
                />
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      </ThemeWrapper>
    </ThreadContext.Provider>
  );
});
