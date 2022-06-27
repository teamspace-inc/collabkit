import { styled } from '@stitches/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { IconContext, X } from 'phosphor-react';
import ScrollArea from './ScrollArea';
import React from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { actions } from '../actions';
import { Comment } from './Comment';
import { Composer } from './Composer';
import { WorkspaceContext } from './Workspace';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { mauve } from '@radix-ui/colors';
import * as Tooltip from './Tooltip';
import { Workspace } from '../constants';

const StyledThread = styled('div', {
  padding: 0,
  gap: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  flex: 1,
  height: '100%',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '11px',

  variants: {
    type: {
      popout: {
        marginTop: '0.414rem',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '11px',
        maxWidth: '286px',
        boxShadow: '0 6px 11px rgba(0, 0, 0, 0.1)',
      },
    },
    hasComments: {
      true: {
        minHeight: '320px',
      },
    },
  },
});

const StyledCommentList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  padding: '0px 0px',
});

const StyledThreadHeader = styled('div', {
  height: 40,
  borderBottom: '1px solid $gray200',
  display: 'flex',
  gap: 0,
  padding: '3px 3px',
  alignItems: 'center',
  variants: {
    type: {
      popout: {
        borderTopRightRadius: 11,
        borderTopLeftRadius: 11,
      },
    },
  },
});

const StyledIconButton = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 22,
  height: 32,
  width: 32,
  cursor: 'pointer',

  '&:hover': {
    background: '$gray200',
    cursor: 'pointer',
  },
});

function IconButton(props: { children: React.ReactNode; tooltip: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <StyledIconButton>{props.children}</StyledIconButton>
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

function Audience(props: {}) {
  return <div></div>;
}

export function Thread(props: { threadId: string; type?: 'popout' }) {
  const { threadId } = props;
  const { workspaceId } = useContext(WorkspaceContext);
  const { workspaces, profiles, appState, config, isConnected } = useSnapshot(store);
  const [textareaHeight, setTextareaHeight] = useState(-1);

  const workspace = workspaceId ? (workspaces[workspaceId] as Workspace) : null;
  const timeline = workspace ? workspace.timeline[props.threadId] : null;
  const isEmpty = timeline ? Object.keys(timeline).length === 0 : true;

  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // const intersection = useIntersectionObserver(ref, [props.threadId, props.type]);

  useEffect(() => {
    if (workspaceId && appState === 'ready') {
      actions.initThread({ workspaceId, threadId });
      actions.loadThread({ workspaceId, threadId });
    }
  }, [workspaceId, props.threadId, appState]);

  const handleScroll = useCallback((e: React.SyntheticEvent) => {
    console.log('didScroll', e.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }, [timeline && Object.keys(timeline).length]);

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
        {!isConnected ? (
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          ></div>
        ) : null}
        {isConnected && isEmpty ? (
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontWeight: '400', fontSize: '1rem' }}>Start the conversation</div>
          </div>
        ) : null}
        <IconContext.Provider value={{ size: '20px' }}>
          {!isEmpty && props.type === 'popout' && (
            <StyledThreadHeader type={props.type}>
              <StyledHeaderLeftGroup />
              <IconButton tooltip="Close">
                <X />
              </IconButton>
            </StyledThreadHeader>
          )}
          {/* {!isEmpty && props.type !== 'popout' && (
            <StyledThreadHeader>
              <StyledHeaderLeftGroup />
              <IconButton tooltip="Resolve">
                <Check />
              </IconButton>
            </StyledThreadHeader>
          )} */}
          {!isEmpty && timeline && (
            <StyledCommentList
              style={
                textareaHeight > -1 ? { maxHeight: `calc(100% - ${textareaHeight + 2}px)` } : {}
              }
            >
              <ScrollArea.Root style={{ ...(props.type === 'popout' ? { height: 352 } : {}) }}>
                <ScrollArea.Viewport
                  css={{
                    display: 'flex',
                    flex: 1,
                  }}
                  onScroll={handleScroll}
                  ref={scrollRef}
                >
                  {Object.keys(timeline).map((id) => (
                    <Comment
                      timestamp={timeline[id].createdAt}
                      key={id}
                      body={timeline[id].body}
                      profile={profiles[timeline[id].createdById]}
                    />
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </StyledCommentList>
          )}
          {workspaceId && workspace ? (
            <Composer
              workspace={workspace}
              onHeightChange={setTextareaHeight}
              profile={config.identify?.userId ? profiles[config.identify?.userId] : undefined}
              workspaceId={workspaceId}
              threadId={props.threadId}
              isFloating={false}
            />
          ) : null}
        </IconContext.Provider>
      </StyledThread>
    </div>
  );
}
