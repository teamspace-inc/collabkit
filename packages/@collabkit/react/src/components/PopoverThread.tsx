import { styled } from '@stitches/react';
import React, { forwardRef, useEffect } from 'react';
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
import { ThreadContext } from '../hooks/useThreadContext';
import { ComposerSendButton } from './composer/ComposerSendButton';
import { IconButton } from './IconButton';
import { Check, X } from './icons';

const Root = styled('div', popoverThreadStyles.root);

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
      <Root data-collabkit-internal="true" style={props.style} ref={ref}>
        {commentList}
      </Root>
    </div>
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
  const { store, events, theme } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);
  const { timeline, isResolved, isEmpty, target } = useThread({
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

  if (!workspaceId || !userId) {
    return null;
  }

  return (
    <ThreadContext.Provider value={context ?? { userId, threadId, workspaceId }}>
      <Root data-collabkit-internal="true" style={props.style} ref={ref}>
        <ScrollAreaRoot>
          <ScrollAreaViewport style={{ maxHeight: props.maxAvailableSize?.height ?? 'unset' }}>
            <div>
              {!isEmpty && target && (
                <ThreadHeader
                  renderRight={() => (
                    <>
                      <IconButton
                        // TODO: tooltip hijacks focus when used within a modal popover
                        // tooltip={isResolved ? 'Re-open' : 'Mark as Resolved and Hide'}
                        onPointerDown={(e) =>
                          events.onPointerDown(e, {
                            target: {
                              ...target,
                              type: isResolved ? 'reopenThreadButton' : 'resolveThreadButton',
                            } as const,
                          })
                        }
                      >
                        {!isResolved ? (
                          <Check
                            size={19}
                            weight={'thin'}
                            color={theme.colors.neutral12.toString()}
                          />
                        ) : (
                          <Check
                            size={18}
                            weight={'fill'}
                            color={theme.colors.neutral12.toString()}
                          />
                        )}
                      </IconButton>
                      <IconButton
                        // tooltip="Close"
                        onPointerDown={(e) => {
                          events.onPointerDown(e, {
                            target: { ...target, type: 'closeThreadButton' },
                          });
                        }}
                      >
                        <X size="16" weight="regular" color={theme.colors.neutral12.toString()} />
                      </IconButton>
                    </>
                  )}
                />
              )}
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
              {!isEmpty && timeline && (
                // nc: there's something causing a scrollbar to appear
                // without the extra 20px of height. need to investigate
                // furtheer.
                <CommentList timeline={timeline} />
              )}
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
                    <ComposerSendButton
                      renderButton={({ disabled, onPointerDown }) => (
                        <Button
                          type="primary"
                          disabled={disabled}
                          onPointerDown={onPointerDown}
                          text={'Comment'}
                        />
                      )}
                    />
                  </div>
                </div>
              </Composer>
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaRoot>
      </Root>
    </ThreadContext.Provider>
  );
});
