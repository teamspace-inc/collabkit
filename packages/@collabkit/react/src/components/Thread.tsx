import { FlexCenter, styled, theme } from './UIKit';
import { useContext, useEffect, useRef, useState } from 'react';
import { IconContext, X, ChatCircle } from 'phosphor-react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { actions } from '../actions';
import { Composer } from './Composer';
// import { WorkspaceIDContext } from './Workspace';
// import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import * as Tooltip from './Tooltip';
import { WorkspaceContext, WorkspaceLoader } from './WorkspaceLoader';
import { CommentList } from './CommentList';

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
        marginTop: '0.414rem',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '11px',
        width: '280px',
        height: '396px',
        boxShadow: '0px 12px 24px rgba(0,0,0,0.04)',
      },
    },
  },
});

const StyledThreadHeader = styled('div', {
  height: 40,
  display: 'flex',
  gap: 0,
  padding: '3px 3px',
  alignItems: 'center',
  pointerEvents: 'none',
  variants: {
    type: {
      popout: {
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        zIndex: 99,
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
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <StyledIconButton onClick={(e) => props.onCloseButtonClick?.(e)}>
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

const StyledHeaderLeftGroup = styled('div', {
  display: 'flex',
  flexGrow: 1,
  gap: 0,
});

function _Thread(props: {
  threadId: string;
  type?: 'popout';
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { threadId } = props;
  const { profiles, appState, config, isConnected } = useSnapshot(store);
  const [textareaHeight, setTextareaHeight] = useState(-1);

  const { workspace, workspaceId } = useContext(WorkspaceContext);
  const timeline = workspace ? workspace.timeline[props.threadId] : null;
  const isEmpty = timeline ? Object.keys(timeline).length === 0 : true;

  const ref = useRef<HTMLDivElement>(null);

  // const intersection = useIntersectionObserver(ref, [props.threadId, props.type]);

  useEffect(() => {
    if (workspace && workspaceId && appState === 'ready') {
      actions.initThread({ workspaceId, threadId });
      actions.loadThread({ workspaceId, threadId });
    }
  }, [workspaceId, props.threadId, appState]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        height: '100%',
        flex: 1,
      }}
    >
      <StyledThread type={props.type}>
        {!isConnected ? <FlexCenter /> : null}
        {isConnected && isEmpty ? (
          <FlexCenter>
            <NullState>
              <ChatCircle weight="fill" size={60} color={theme.colors.neutral8.toString()} />
              No comments
            </NullState>
          </FlexCenter>
        ) : null}
        <IconContext.Provider value={{ size: '20px' }}>
          {props.type === 'popout' && (
            <StyledThreadHeader type={props.type}>
              <StyledHeaderLeftGroup />
              <IconButton tooltip="Close" onCloseButtonClick={(e) => props.onCloseButtonClick?.(e)}>
                <X color={theme.colors.neutral12.toString()} />
              </IconButton>
            </StyledThreadHeader>
          )}
          {!isEmpty && timeline && workspaceId && (
            <CommentList
              type={props.type}
              profiles={profiles}
              threadId={props.threadId}
              workspaceId={workspaceId}
              composerHeight={textareaHeight}
              timeline={timeline}
            />
          )}
          {workspaceId && workspace ? (
            <Composer
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
              workspace={workspace}
              workspaceId={workspaceId}
              onHeightChange={setTextareaHeight}
              profile={config.identify?.userId ? profiles[config.identify?.userId] : undefined}
              threadId={props.threadId}
              isFloating={false}
            />
          ) : null}
        </IconContext.Provider>
      </StyledThread>
    </div>
  );
}

export function Thread(props: {
  threadId: string;
  type?: 'popout';
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <WorkspaceLoader>
      <_Thread {...props} />
    </WorkspaceLoader>
  );
}
