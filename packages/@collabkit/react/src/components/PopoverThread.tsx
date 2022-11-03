import React, { forwardRef } from 'react';
import { ThreadInfo } from '@collabkit/core';
import CommentList from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { useSnapshot } from 'valtio';
import { Scrollable } from './ScrollArea';
import Comment from './Comment';
import Composer from './composer/Composer';
import Profile from './Profile';
import * as styles from '../styles/components/PopoverThread.css';
import { ThemeWrapper } from './ThemeWrapper';
// import { useComposer } from '../hooks/useComposer';
// import { ButtonGroup } from './ButtonGroup';
import { ThreadProvider } from './Thread';

type PopoverThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  maxAvailableSize?: { width: number; height: number } | null;
  hideComposer?: boolean;
  formatTimestamp?: (timestamp: number) => string;
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
    <ThreadProvider {...props}>
      <ThemeWrapper>
        <div
          className={styles.previewRoot}
          data-collabkit-internal="true"
          style={props.style}
          ref={ref}
        >
          <Scrollable maxHeight={props.maxAvailableSize?.height ?? 'unset'}>
            <CommentList.Root className={styles.commentList}>
              <Comment.Root
                className={styles.comment}
                commentId={event.id}
                style={{ paddingTop: '16px' }}
              >
                <Comment.Content>
                  <Comment.Header className={styles.commentHeader()}>
                    <Profile.Avatar />
                    <Comment.NameAndTimestampWrapper>
                      <Comment.CreatorName />
                      <Comment.Timestamp format={props.formatTimestamp} />
                    </Comment.NameAndTimestampWrapper>
                  </Comment.Header>
                  <Comment.Body />
                </Comment.Content>
              </Comment.Root>
            </CommentList.Root>
          </Scrollable>
        </div>
      </ThemeWrapper>
    </ThreadProvider>
  );
});

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  // const { threadId } = props;

  const { store } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty } = useThread({
    ...props,
    store,
    workspaceId,
  });

  // const { isEnabled, onPointerDown } = useComposer({ workspaceId, threadId });

  const profile = userId ? profiles[userId] : null;

  if (!workspaceId || !userId) {
    return null;
  }

  return (
    <ThreadProvider {...props}>
      <ThemeWrapper>
        <div className={styles.root} data-collabkit-internal="true" style={props.style} ref={ref}>
          <Scrollable maxHeight={props.maxAvailableSize?.height ?? 'unset'}>
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
            <CommentList />
            {props.hideComposer ? null : <Composer />}
          </Scrollable>
        </div>
      </ThemeWrapper>
    </ThreadProvider>
  );
});

/* <Composer.Root className={styles.composerRoot} autoFocus={props.autoFocus ?? true}>
    <Composer.Editor
      contentEditable={<Composer.ContentEditable />}
      placeholder={
        <Composer.Placeholder>
          {isEmpty ? 'Add a comment' : 'Reply to this comment'}
        </Composer.Placeholder>
      }
    />
  </Composer.Root> */
/* <ButtonGroup
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
  /> */
