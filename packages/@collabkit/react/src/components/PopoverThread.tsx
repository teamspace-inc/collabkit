import React, { forwardRef } from 'react';
import { ThreadInfo } from '@collabkit/core';

import * as CommentList from './CommentList';

import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { useSnapshot } from 'valtio';

import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';

import Comment from './Comment';
import Composer from './composer/Composer';
import Profile from './Profile';
import { PopoverThreadCommentEditor } from './PopoverThreadCommentEditor';
import * as styles from '../styles/components/PopoverThread.css';
import { ThemeWrapper } from './ThemeWrapper';

// import { useComposer } from '../hooks/useComposer';
// import { ButtonGroup } from './ButtonGroup';

import { ThreadContextProvider } from './Thread';
import { ResolveThreadIconButton } from './ResolveThreadIconButton';
// import { CloseThreadIconButton } from './CloseThreadIconButton';
// import { vars } from '../styles/theme';
// import { PrevThreadIconButton } from './PrevThreadIconButton';
// import { NextThreadIconButton } from './NextThreadIconButton';
// import { style } from '@vanilla-extract/css';

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
              <Comment commentId={event.id} />
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

// const header = style({
//   display: 'flex',
//   flexDirection: 'row',
//   gap: '0',
//   padding: '8px 16px 8px 12px',
//   borderBottom: `1px solid ${vars.color.surfaceOverlay}`,
// });

// const iconList = style({
//   display: 'flex',
//   flexDirection: 'row',
//   gap: '4px',
// });

// export function PopoverThreadHeader() {
//   return (
//     <div className={header}>
//       <div className={iconList}>
//         <PrevThreadIconButton />
//         <NextThreadIconButton />
//         <ResolveThreadIconButton />
//       </div>
//       <div style={{ flex: 1 }} />
//       <CloseThreadIconButton />
//     </div>
//   );
// }

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { store } = useApp();
  const { workspaceId, userId } = useSnapshot(store);

  const { isEmpty, list } = useThread({
    ...props,
    store,
    workspaceId,
  });

  if (!workspaceId || !userId) {
    return null;
  }

  return (
    <ThreadContextProvider {...props}>
      <ThemeWrapper>
        <div className={styles.root} data-collabkit-internal="true" ref={ref}>
          {/* <PopoverThreadHeader /> */}
          <ScrollAreaRoot>
            <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
              {isEmpty && <div style={{ height: 16 }} />}
              {!isEmpty && list ? (
                <CommentList.Root>
                  {list.map((group, gi) =>
                    group.map((comment) => (
                      <Comment.Root commentId={comment.id} key={comment.id}>
                        <Comment.Content>
                          <Comment.Header>
                            <Profile.Avatar />
                            <Comment.NameAndTimestampWrapper>
                              <Comment.CreatorName />
                              <Comment.Timestamp format={props.formatTimestamp} />
                            </Comment.NameAndTimestampWrapper>
                            <Comment.Actions>
                              {gi === 0 ? <ResolveThreadIconButton /> : null}
                              <Comment.MoreMenu />
                            </Comment.Actions>
                          </Comment.Header>
                          <Comment.Indent>
                            <Comment.Body />
                          </Comment.Indent>
                          <PopoverThreadCommentEditor />
                        </Comment.Content>
                      </Comment.Root>
                    ))
                  )}
                </CommentList.Root>
              ) : null}
              {props.hideComposer ? null : (
                <div className={styles.composerForm}>
                  <Composer.Root autoFocus={props.autoFocus ?? true}>
                    <Profile.Provider profileId={userId}>
                      <Profile.Avatar />
                    </Profile.Provider>
                    <Composer.Editor
                      contentEditable={<Composer.ContentEditable />}
                      placeholder={
                        <Composer.Placeholder>
                          {isEmpty ? 'Add a comment' : 'Reply to this comment'}
                        </Composer.Placeholder>
                      }
                    />
                  </Composer.Root>
                </div>
              )}
              <div className={styles.spacerBottom} />
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
