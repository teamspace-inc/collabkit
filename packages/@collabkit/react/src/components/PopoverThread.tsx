import { styled } from '@stitches/react';
import React, { forwardRef } from 'react';
import type { ThreadInfo } from '@collabkit/core';
import { Composer } from './composer/Composer';
import { CommentList } from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { ThreadHeader } from './ThreadHeader';
import { popoverThreadStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import { ComposerEditor } from './composer/ComposerEditor';
import { Button } from './Button';
import { MessageHeader } from './comment/MessageHeader';
import { Avatar } from './Avatar';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';

const StyledPopoverThread = styled('div', popoverThreadStyles.thread);

export const MODAL_Z_INDEX = 999999;

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
    <CommentList isPreview={true} timeline={timeline} />
  );
  return (
    <div>
      <StyledPopoverThread data-collabkit-internal="true" style={props.style} ref={ref}>
        {commentList}
      </StyledPopoverThread>
    </div>
  );
});

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { threadId } = props;
  const { store, events } = useApp();
  const { workspaces, workspaceId, profiles, userId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const { timeline, isResolved, isEmpty, target } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const composer = workspace ? workspace.composers[threadId] : null;

  const bodyLength = composer?.$$body.trim().length ?? 0;

  const profile = userId ? profiles[userId] : null;

  const commentList = userId && workspaceId && timeline && (
    <CommentList isPreview={false} timeline={timeline} />
  );

  return (
    <StyledPopoverThread data-collabkit-internal="true" style={props.style} ref={ref}>
      <ScrollAreaRoot>
        <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
          <div>
            {!isEmpty && target && <ThreadHeader isResolved={isResolved} target={target} />}
            {isEmpty && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '12px',
                  padding: '16px 12px',
                  alignItems: 'center',
                }}
              >
                {profile ? <Avatar profile={profile} /> : null}
                {profile ? <MessageHeader name={profile.name ?? 'Anonymous'} /> : null}
              </div>
            )}
            {!isEmpty && (
              // nc: there's something causing a scrollbar to appear
              // without the extra 20px of height. need to investigate
              // furtheer.
              <div>{commentList}</div>
            )}

            {workspaceId && userId ? (
              <Composer>
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
                  <ComposerEditor
                    placeholder={
                      props.composerPrompt != null
                        ? props.composerPrompt
                        : isEmpty
                        ? 'Add a comment'
                        : 'Reply to this comment'
                    }
                    autoFocus={true}
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
                      disabled={bodyLength === 0}
                      onPointerDown={(e) => {
                        if (bodyLength > 0) {
                          events.onSend(workspaceId, threadId);
                        }
                      }}
                      text={'Comment'}
                    />
                  </div>
                </div>
              </Composer>
            ) : null}
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </StyledPopoverThread>
  );
});
