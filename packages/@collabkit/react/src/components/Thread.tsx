import { styled } from '@stitches/react';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, IconContext, X } from 'phosphor-react';
import * as Tooltip from './Tooltip';
import ScrollArea from './ScrollArea';
import React from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import { actions } from '../actions';
import { Comment } from './Comment';
import { Composer } from './Composer';
import { WorkspaceContext } from './Workspace';

const StyledThread = styled('div', {
  backgroundColor: 'white',
  borderRadius: '11px',
  padding: 0,
  boxShadow: '0 6px 11px rgba(0, 0, 0, 0.1)',
  maxWidth: '286px',
  gap: 0,
  display: 'flex',
  flexDirection: 'column',

  variants: {
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
  maxHeight: '308px',
  padding: '0px 0px',
});

const StyledThreadHeader = styled('div', {
  height: 40,
  borderBottom: '1px solid $gray200',
  display: 'flex',
  gap: 0,
  padding: '3px 3px',
  alignItems: 'center',
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

export function Thread(props: { threadId: string }) {
  const { workspaceId } = useContext(WorkspaceContext);
  const { workspaces, profiles, appState, config } = useSnapshot(store);
  React.useMemo(() => {
    if (workspaceId) {
      store.workspaces[workspaceId] ||= {
        timeline: {},
        composers: {
          [props.threadId]: {
            body: '',
          },
        },
      };
    }
  }, [props.threadId, workspaceId]);

  const workspace = workspaceId && workspaces[workspaceId];
  const timeline = workspace && workspace.timeline[props.threadId];
  const isEmpty = timeline && Object.keys(timeline).length === 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  console.log(isEmpty, timeline);

  useEffect(() => {
    if (workspaceId && appState === 'ready') {
      actions.openThread(workspaceId, props.threadId);
    }
  }, [workspaceId, props.threadId, appState]);

  const handleScroll = useCallback((e: React.SyntheticEvent) => {
    console.log('didScroll', e.currentTarget.scrollTop);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }, [timeline && Object.keys(timeline).length]);

  return (
    <div>
      <StyledThread>
        <IconContext.Provider value={{ size: '20px' }}>
          {!isEmpty && (
            <StyledThreadHeader>
              <StyledHeaderLeftGroup>
                <IconButton tooltip="Previous Comment">
                  <ArrowLeft />
                </IconButton>
                <IconButton tooltip="Next Comment">
                  <ArrowRight />
                </IconButton>
              </StyledHeaderLeftGroup>
              <IconButton tooltip="Mark as done">
                <CheckCircle />
              </IconButton>
              <IconButton tooltip="Close">
                <X />
              </IconButton>
            </StyledThreadHeader>
          )}
          {!isEmpty && timeline && (
            <StyledCommentList>
              <ScrollArea.Root>
                <ScrollArea.Viewport
                  css={{ backgroundColor: 'white' }}
                  onScroll={handleScroll}
                  ref={scrollRef}
                >
                  {Object.keys(timeline).map((id) => (
                    <Comment
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
          {workspaceId ? (
            <Composer
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
