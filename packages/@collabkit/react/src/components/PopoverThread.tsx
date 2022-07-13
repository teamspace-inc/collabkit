import { styled, theme } from './UIKit';
import { IconContext } from 'phosphor-react';
import React, { useState } from 'react';
import { Composer } from './Composer';
import * as Tooltip from './Tooltip';
import { useWorkspace } from '../hooks/useWorkspace';
import { CommentList } from './CommentList';
import { useApp } from './App';
import { useThread } from './useThread';
import { ThreadHeader } from './ThreadHeader';
import { StyledThread } from './thread/StyledThread';

const StyledPopverThread = styled(StyledThread, {
  backgroundColor: '$neutral1',
  borderRadius: '$radii$1',
  display: 'flex',
  width: '$threadWidth',
});

const StyledIconButton = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 32,
  cursor: 'pointer',
  pointerEvents: 'all',

  '&:hover': {
    cursor: 'pointer',
  },
});

export function IconButton(props: {
  children: React.ReactNode;
  tooltip: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <StyledIconButton onPointerDown={(e) => props.onPointerDown?.(e)}>
          {props.children}
        </StyledIconButton>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {props.tooltip}
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export const StyledHeaderLeftGroup = styled('div', {
  display: 'flex',
  flexGrow: 1,
  gap: 0,
});

export const MODAL_Z_INDEX = 999999;

export function PopoverThread(props: { threadId: string; style?: React.CSSProperties }) {
  const { store } = useApp();
  const userId = store.config.identify?.userId!;
  const [composerHeight, setComposerHeight] = useState(0);

  const { workspace, workspaceId } = useWorkspace();

  const { profiles, timeline, isResolved, isEmpty, target } = useThread({
    ...props,
    store,
    workspaceId,
    workspace,
  });

  return (
    <StyledPopverThread isEmpty={isEmpty} style={props.style}>
      <IconContext.Provider value={{ size: '20px' }}>
        {!isEmpty && <ThreadHeader isResolved={isResolved} target={target} />}
        {!isEmpty && timeline && (
          <CommentList
            isTyping={workspace?.composers[props.threadId]?.isTyping}
            type={'popover'}
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
            // minus top padding
            style={{
              borderRadius: '12px',
              minHeight: `${composerHeight - 6}px`,
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
            onHeightChange={setComposerHeight}
          />
        }
      </IconContext.Provider>
    </StyledPopverThread>
  );
}
