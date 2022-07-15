import { styled } from './UIKit';
import { IconContext } from 'phosphor-react';
import React, { useRef, useState } from 'react';
import { Composer } from './Composer';
import { useWorkspace } from '../hooks/useWorkspace';
import { CommentList } from './CommentList';
import { useApp } from './useApp';
import { useThread } from './useThread';
import { ThreadHeader } from './ThreadHeader';
import { StyledThread } from './thread/StyledThread';
import {
  TLBoundsCorner,
  TLBoundsEdge,
  useIntersectionObserver,
} from '../hooks/useIntersectionObserver';

const StyledPopoverThread = styled(StyledThread, {
  backgroundColor: '$neutral1',
  borderRadius: '$radii$1',
  display: 'flex',
  width: '$threadWidth',
  zIndex: 9999,
  variants: {
    intersection: {
      [TLBoundsEdge.Right]: {
        opacity: 1,
        transform: `translateX(calc(-100% - 44px))`,
      },
      [TLBoundsEdge.Bottom]: {
        opacity: 1,
        transform: `translateY(200%)`,
      },
      [TLBoundsCorner.BottomRight]: {
        opacity: 1,
        transform: `translateY(200%)`,
      },
      other: { opacity: 1 },
      none: { opacity: 1 },
      pending: {
        opacity: 0,
      },
    },
  },
});

export const MODAL_Z_INDEX = 999999;

export function PopoverThread(props: { threadId: string; style?: React.CSSProperties }) {
  const { store, theme } = useApp();
  const ref = useRef<HTMLDivElement | null>(null);
  const userId = store.config.identify?.userId!;
  const { workspace, workspaceId } = useWorkspace();
  const { profiles, timeline, isResolved, isEmpty, target } = useThread({
    ...props,
    store,
    workspaceId,
    workspace,
  });

  const intersection = useIntersectionObserver({ ref, root: null }, []);

  console.log('intersection', intersection);

  return (
    <StyledPopoverThread
      isEmpty={isEmpty}
      style={props.style}
      ref={ref}
      intersection={intersection}
    >
      <IconContext.Provider value={{ size: '20px' }}>
        {!isEmpty && <ThreadHeader isResolved={isResolved} target={target} />}
        {!isEmpty && timeline && (
          <CommentList
            isTyping={workspace?.composers[props.threadId]?.isTyping}
            profiles={profiles}
            threadId={props.threadId}
            userId={userId}
            workspaceId={workspaceId}
            timeline={timeline}
          />
        )}
        {
          <Composer
            workspace={workspace}
            placeholder={isEmpty ? 'Add a comment' : 'Reply to this comment'}
            style={{
              borderRadius: theme.radii['2'].value.toString(),
              ...(isEmpty
                ? {}
                : {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderTop: `1px solid ${theme.colors.borderColor.toString()}`,
                  }),
            }}
            workspaceId={workspaceId}
            profile={profiles[userId]}
            threadId={props.threadId}
            isFloating={false}
          />
        }
      </IconContext.Provider>
    </StyledPopoverThread>
  );
}
