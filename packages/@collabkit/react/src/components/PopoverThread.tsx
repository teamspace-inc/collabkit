import { styled } from '@stitches/react';
import { IconContext } from 'phosphor-react';
import React, { useRef, useEffect, useState } from 'react';
import { Composer } from './Composer';
import { useWorkspace } from '../hooks/useWorkspace';
import { CommentList } from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { ThreadHeader } from './ThreadHeader';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useWindowSize } from '../hooks/useWindowSize';
import { popoverThreadStyles } from '@collabkit/theme';

const StyledPopoverThread = styled('div', popoverThreadStyles.thread);

export const MODAL_Z_INDEX = 999999;

export function PopoverThread(props: {
  threadId: string;
  style?: React.CSSProperties;
  isPreview?: boolean;
  maxAvailableSize?: { width: number; height: number };
}) {
  const { store, theme } = useApp();
  const [didOverflowY, setDidOverflowY] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const userId = store.config.identify?.userId!;
  const [composerHeight, setComposerHeight] = useState(47); // default composer height
  const { workspace, workspaceId } = useWorkspace();
  const { profiles, timeline, isResolved, isEmpty, target } = useThread({
    ...props,
    store,
    workspaceId,
    workspace,
  });

  const windowSize = useWindowSize();

  useEffect(() => {
    if (!props.maxAvailableSize) {
      return;
    }
    if (!ref.current) {
      return;
    }
    if (!scrollContainerRef.current) {
      return;
    }
    if (props.maxAvailableSize.width === -1 || props.maxAvailableSize.height === -1) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();

    if (rect.height > props.maxAvailableSize.height || didOverflowY) {
      setDidOverflowY(true);
      scrollContainerRef.current.style.height = `${
        props.maxAvailableSize.height - composerHeight - 100
      }px`;
    }
  }, [
    props.isPreview,
    // props.maxAvailableSize?.width,
    props.maxAvailableSize?.height,
    composerHeight,
    windowSize?.height,
    // windowSize?.width,
  ]);

  return (
    <StyledPopoverThread data-collabkit-internal="true" style={props.style} ref={ref}>
      <IconContext.Provider value={{ size: '20px' }}>
        {!isEmpty && !props.isPreview && <ThreadHeader isResolved={isResolved} target={target} />}
        {!isEmpty && timeline && (
          // nc: there's something causing a scrollbar to appear
          // without the extra 20px of height. need to investigate
          // furtheer.
          <div ref={scrollContainerRef}>
            {!props.isPreview ? (
              <ScrollableCommentList
                isTyping={workspace?.composers[props.threadId]?.isTyping}
                profiles={profiles}
                threadId={props.threadId}
                userId={userId}
                workspaceId={workspaceId}
                isPreview={props.isPreview}
                timeline={timeline}
              />
            ) : (
              <CommentList
                isTyping={workspace?.composers[props.threadId]?.isTyping}
                profiles={profiles}
                threadId={props.threadId}
                userId={userId}
                workspaceId={workspaceId}
                isPreview={props.isPreview}
                timeline={timeline}
              />
            )}
          </div>
        )}
        {props.isPreview ? null : (
          <Composer
            workspace={workspace}
            placeholder={isEmpty ? 'Write a comment' : 'Reply to this comment'}
            style={{
              borderRadius: theme.radii['2'].value.toString(),
              paddingBottom: '12px',
              ...(isEmpty
                ? {}
                : {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }),
            }}
            autoFocus={true}
            workspaceId={workspaceId}
            profile={profiles[userId]}
            threadId={props.threadId}
            isFloating={false}
            hideAvatar={isEmpty}
            onHeightChange={(height) => setComposerHeight(height)}
          />
        )}
      </IconContext.Provider>
    </StyledPopoverThread>
  );
}
