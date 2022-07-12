import { FlexCenter, styled, theme } from './UIKit';
import { useEffect, useRef, useState } from 'react';
import { IconContext, X, ChatCircle, Check, CheckCircle } from 'phosphor-react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { Composer } from './Composer';
import * as Tooltip from './Tooltip';
import { useWorkspace } from '../hooks/useWorkspace';
import { CommentList } from './CommentList';
import { useApp } from './App';
import { actions } from '../actions';

const StyledThread = styled('div', {
  padding: 0,
  gap: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  flex: 1,
  height: '100%',
  borderRadius: '11px',

  variants: {
    type: {
      popout: {
        border: '1px solid $neutral6',
        marginTop: '0.212rem',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'white',
        borderRadius: '11px',
        width: '$threadWidth',
        // height: '396px',
        boxShadow: '0px 12px 24px rgba(0,0,0,0.04)',
      },
    },
    isEmpty: {
      true: {},
    },
  },
  compoundVariants: [
    {
      type: 'popout',
      isEmpty: true,
      css: {
        height: 'auto',
      },
    },
  ],
});

const StyledThreadHeader = styled('div', {
  height: 30,
  display: 'flex',
  gap: 0,
  padding: '2px 0px',
  alignItems: 'center',
  pointerEvents: 'none',
  borderBottom: '1px solid $borderColor',
  variants: {
    type: {
      popout: {
        // borderTopRightRadius: 11,
        // borderTopLeftRadius: 11,
        // position: 'absolute',
        // left: 0,
        // top: 0,
        // right: 0,
        // zIndex: 99,
      },
    },
  },
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

function IconButton(props: {
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

const StyledHeaderLeftGroup = styled('div', {
  display: 'flex',
  flexGrow: 1,
  gap: 0,
});

export const MODAL_Z_INDEX = 999999;

export function Thread(props: {
  threadId: string;
  type?: 'popout';
  style?: React.CSSProperties;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { store, events } = useApp();
  const { threadId } = props;
  const { profiles, appState, config, isConnected, reactingId } = useSnapshot(store);
  const userId = config.identify!.userId;
  // const profile = userId ? profiles[userId] : null;

  const [composerHeight, setTextareaHeight] = useState(-1);

  const { workspace, workspaceId } = useWorkspace();
  const timeline = workspace ? workspace.timeline[props.threadId] : null;
  const isEmpty = timeline ? Object.keys(timeline).length === 0 : true;

  const ref = useRef<HTMLDivElement>(null);

  // const intersection = useIntersectionObserver(ref, [props.threadId, props.type]);

  useEffect(() => {
    if (workspace && workspaceId && appState === 'ready') {
      actions.subscribeThread(store, { workspaceId, threadId });
    }
  }, [workspaceId, props.threadId, appState]);

  if (!workspaceId) {
    return null;
  }

  const target = { type: 'thread', threadId, workspaceId } as const;

  const systemEventIds = timeline
    ? Object.keys(timeline).filter(
        (eventId) =>
          (timeline[eventId].type === 'system' && timeline[eventId].system === 'resolve') ||
          timeline[eventId].system === 'reopen'
      )
    : [];

  const isResolved =
    timeline &&
    systemEventIds.length > 0 &&
    timeline[systemEventIds[systemEventIds.length - 1]].system === 'resolve';

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        height: '100%',
        position: 'relative',
        flex: 1,
        ...(props.type === 'popout'
          ? {}
          : {
              background: 'white',
              borderRadius: 11,
              border: '1px solid rgba(0,0,0,0.1)',
            }),
        ...props.style,
      }}
    >
      {reactingId ? (
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
      ) : null}
      <StyledThread type={props.type} isEmpty={isEmpty}>
        {!isConnected && props.type !== 'popout' ? <FlexCenter /> : null}
        {isConnected && isEmpty && props.type !== 'popout' ? (
          <FlexCenter>
            <NullState>
              <ChatCircle weight="fill" size={60} color={theme.colors.neutral8.toString()} />
              No comments
            </NullState>
          </FlexCenter>
        ) : null}
        <IconContext.Provider value={{ size: '20px' }}>
          {props.type === 'popout' && !isEmpty && (
            <StyledThreadHeader type={props.type}>
              <StyledHeaderLeftGroup />
              <IconButton
                tooltip={isResolved ? 'Re-open' : 'Resolve'}
                onClick={(e) =>
                  events.onClick(e, {
                    target: {
                      ...target,
                      type: isResolved ? 'reopenThreadButton' : 'resolveThreadButton',
                    } as const,
                  })
                }
              >
                {!isResolved ? (
                  <Check size={16} weight={'light'} color={theme.colors.neutral12.toString()} />
                ) : (
                  <CheckCircle size={18} weight={'fill'} color={theme.colors.accent10.toString()} />
                )}
              </IconButton>
              <IconButton
                tooltip="Close"
                onClick={(e) => {
                  // if called from a button we need to use this
                  props.onCloseButtonClick?.(e);
                  events.onClick(e, { target });
                }}
              >
                <X size="16" weight="light" color={theme.colors.neutral12.toString()} />
              </IconButton>
            </StyledThreadHeader>
          )}
          {!isEmpty && timeline && workspaceId && (
            <CommentList
              isTyping={workspace?.composers[threadId]?.isTyping}
              type={props.type}
              profiles={profiles}
              threadId={props.threadId}
              userId={userId}
              workspaceId={workspaceId}
              composerHeight={composerHeight}
              headerHeight={props.type === 'popout' ? 37 : 0}
              timeline={timeline}
            />
          )}
          {workspaceId && workspace ? (
            <Composer
              style={
                isEmpty && props.type === 'popout'
                  ? {}
                  : { position: 'absolute', bottom: 0, left: 0, right: 0 }
              }
              workspace={workspace}
              hasComments={!isEmpty}
              workspaceId={workspaceId}
              onHeightChange={setTextareaHeight}
              type={props.type}
              profile={profiles[userId]}
              threadId={props.threadId}
              isFloating={false}
            />
          ) : null}
        </IconContext.Provider>
      </StyledThread>
    </div>
  );
}
