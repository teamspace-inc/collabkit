import React, { forwardRef } from 'react';
import { ThreadInfo } from '@collabkit/core';
import * as CommentList from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { useSnapshot } from 'valtio';
import { format, isSameDay, isSameYear } from 'date-fns';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';
import * as Profile from './Profile';
import { PopoverThreadCommentEditor } from './PopoverThreadCommentEditor';
import * as styles from '../styles/components/PopoverThread.css';
import { ThemeWrapper } from './ThemeWrapper';
import { useComposer } from '../hooks/useComposer';
import { ButtonGroup } from './ButtonGroup';
import { ThreadContextProvider } from './Thread';

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
  hideComposer?: boolean;
}; // make this an extension of ThreadProps

type Handle = HTMLDivElement | null;

export const PreviewThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { store } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty, messageEvents } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const event = messageEvents?.[0];
  const profile = event && profiles[event?.createdById];

  if (!workspaceId || !userId || !event || !profile || isEmpty) {
    return null;
  }

  return (
    <ThreadContextProvider {...props}>
      <ThemeWrapper>
        <div
          className={styles.previewRoot}
          data-collabkit-internal="true"
          style={props.style}
          ref={ref}
        >
          <ScrollAreaRoot>
            <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
              <CommentList.Root className={styles.commentList}>
                <Comment.Root
                  className={styles.comment}
                  eventId={event.id}
                  style={{ paddingTop: '16px' }}
                >
                  <Comment.Content>
                    <Comment.Header className={styles.commentHeader()}>
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
    </ThreadContextProvider>
  );
});

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { threadId } = props;

  const { store, events } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty, list } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const { isEnabled, onPointerDown } = useComposer({ workspaceId, threadId });

  const profile = userId ? profiles[userId] : null;

  if (!workspaceId || !userId) {
    return null;
  }

  return (
    <ThreadContextProvider {...props}>
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
                  {list.map((group) =>
                    group.map((event) => (
                      <Comment.Root className={styles.comment} eventId={event.id} key={event.id}>
                        <Comment.Content>
                          <Comment.Header className={styles.commentHeader()}>
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
              {props.hideComposer ? null : (
                <div className={styles.composerForm}>
                  <Composer.Root
                    className={styles.composerRoot}
                    autoFocus={props.autoFocus ?? true}
                  >
                    <Composer.Editor
                      contentEditable={<Composer.ContentEditable />}
                      placeholder={
                        <Composer.Placeholder>
                          {isEmpty ? 'Add a comment' : 'Reply to this comment'}
                        </Composer.Placeholder>
                      }
                    />
                  </Composer.Root>
                  <ButtonGroup
                    onCancel={(e) =>
                      events.onPointerDown(e, {
                        target: {
                          type: 'closeThreadButton',
                          threadId,
                          workspaceId,
                        },
                      })
                    }
                    onConfirm={onPointerDown}
                    confirmButtonEnabled={isEnabled}
                    confirmButtonText={'Comment'}
                  />
                </div>
              )}
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        </div>
      </ThemeWrapper>
    </ThreadContextProvider>
  );
});
