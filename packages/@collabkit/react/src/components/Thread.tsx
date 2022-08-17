import { FlexCenter } from './UIKit';
import { IconContext } from 'phosphor-react';
import React, { useState } from 'react';
import { Composer } from './Composer';
import { useWorkspace } from '../hooks/useWorkspace';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { EmptyState } from './thread/EmptyState';
import { styled } from '@stitches/react';
import { threadStyles } from '@collabkit/theme';

const StyledThreadContainer = styled('div', threadStyles.container);
const StyledThread = styled('div', threadStyles.thread);
const StyledThreadHeader = styled('div', threadStyles.header);
const StyledThreadHeaderTitle = styled('div', threadStyles.headerTitle);

export function Thread(props: {
  threadId: string;
  info?: {
    name?: string;
    url?: string;
  };
  style?: React.CSSProperties;
  composerPrompt?: string;
  showHeader?: boolean;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { threadId } = props;
  const { store } = useApp();
  const userId = store.config.identify?.userId!;

  const [composerHeight, setComposerHeight] = useState(0);

  const { workspace, workspaceId } = useWorkspace();

  const { profiles, timeline, isConnected, isEmpty, ref, reactingId } = useThread({
    ...props,
    store,
    workspaceId,
    workspace,
  });

  return (
    <StyledThreadContainer ref={ref} style={props.style} data-collabkit-internal="true">
      {/* {reactingId ? (
        <div
          onClick={(e) => (reactingId ? events.onEmojiReactionPickerModalBackgroundClick(e) : null)}
          style={{
            position: 'absolute',
            inset: 0,
            transition: 'background-color 0.2s ease-in-out',
            // zIndex: MODAL_Z_INDEX,
            pointerEvents: 'none',
            borderRadius: theme.radii['1'].toString(),
            ...(reactingId
              ? {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  pointerEvents: 'all',
                }
              : {}),
          }}
        />
      ) : null} */}
      <StyledThread>
        {props.showHeader ? (
          <StyledThreadHeader>
            <StyledThreadHeaderTitle>Comments</StyledThreadHeaderTitle>
          </StyledThreadHeader>
        ) : null}
        {!isConnected ? <FlexCenter /> : null}
        {isConnected && isEmpty ? <EmptyState /> : null}
        <IconContext.Provider value={{ size: '20px' }}>
          {!isEmpty && timeline && workspaceId && (
            <ScrollableCommentList
              isTyping={workspace?.composers[threadId]?.isTyping}
              profiles={profiles}
              threadId={props.threadId}
              userId={userId}
              workspaceId={workspaceId}
              // composerHeight={composerHeight}
              // headerHeight={0}
              timeline={timeline}
            />
          )}
          {workspaceId && workspace ? (
            <Composer
              style={{ paddingBottom: '12px' }}
              workspace={workspace}
              placeholder={
                props.composerPrompt
                  ? props.composerPrompt
                  : isEmpty
                  ? 'Add a comment'
                  : 'Reply to this comment'
              }
              workspaceId={workspaceId}
              onHeightChange={setComposerHeight}
              profile={profiles[userId]}
              threadId={props.threadId}
              isFloating={false}
            />
          ) : null}
        </IconContext.Provider>
      </StyledThread>
    </StyledThreadContainer>
  );
}
