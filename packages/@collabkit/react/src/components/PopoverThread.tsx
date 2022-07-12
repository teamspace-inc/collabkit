import { styled } from './UIKit';
import { IconContext } from 'phosphor-react';
import React from 'react';
import { Composer } from './Composer';
import * as Tooltip from './Tooltip';
import { useWorkspace } from '../hooks/useWorkspace';
import { CommentList } from './CommentList';
import { useApp } from './App';
import { useThread } from './useThread';
import { ThreadHeader } from './ThreadHeader';
import { StyledThread } from './thread/StyledThread';

const StyledPopverThread = styled(StyledThread, {
  position: 'absolute',
  left: 0,
  top: 0,
  backgroundColor: '$neutral1',
  borderRadius: '$radii$1',
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

const NullState = styled('div', {
  fontWeight: '400',
  fontSize: '14px',
  color: '$neutral10',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '40px', // composer height
  gap: '5px',
});

export function IconButton(props: {
  children: React.ReactNode;
  tooltip: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <StyledIconButton onClick={(e) => props.onClick?.(e)}>{props.children}</StyledIconButton>
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

export function PopoverThread(props: {
  threadId: string;
  style?: React.CSSProperties;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { store } = useApp();
  const userId = store.config.identify?.userId!;

  const { workspace, workspaceId } = useWorkspace();

  const { profiles, timeline, isResolved, isEmpty, target, ref } = useThread({
    ...props,
    store,
    workspaceId,
    workspace,
  });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        height: '100%',
        position: 'relative',
        flex: 1,
        ...props.style,
      }}
    >
      {/* {reactingId ? (
        <div
          onClick={(e) => (reactingId ? events.onEmojiReactionPickerModalBackgroundClick(e) : null)}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'background-color 0.2s ease-in-out',
            zIndex: MODAL_Z_INDEX,
            pointerEvents: 'none',
            borderRadius: 11,
            ...(reactingId
              ? {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  pointerEvents: 'all',
                }
              : {}),
          }}
        />
      ) : null} */}
      <StyledPopverThread isEmpty={isEmpty}>
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
              // style={
              //   isEmpty && props.type === 'popout'
              //     ? {}
              //     : { position: 'absolute', bottom: 0, left: 0, right: 0 }
              // }
              workspace={workspace}
              hasComments={!isEmpty}
              workspaceId={workspaceId}
              profile={profiles[userId]}
              threadId={props.threadId}
              isFloating={false}
              onHeightChange={function (height: number): void {
                throw new Error('Function not implemented.');
              }}
            />
          }
        </IconContext.Provider>
      </StyledPopverThread>
    </div>
  );
}
