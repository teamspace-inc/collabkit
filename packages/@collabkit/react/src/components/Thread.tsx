import { FlexCenter, styled } from './UIKit';
import { IconContext, ChatCircle, X } from 'phosphor-react';
import React, { useState } from 'react';
import { Composer } from './Composer';
import { useWorkspace } from '../hooks/useWorkspace';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { StyledThread } from './thread/StyledThread';

const NullState = styled('div', {
  fontWeight: '400',
  fontSize: '$fontSize$1',
  color: '$neutral10',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  // todo make this dynamic
  // marginBottom: '40px', // composer height
  gap: '$padding$0',
});

const StyledThreadContainer = styled('div', {
  display: 'flex',
  height: '100%',
  position: 'relative',
  flex: 1,
  background: '$neutral1',
  borderRadius: 11,
});

const StyledThreadHeader = styled('div', {
  fontSize: '16px',
  fontWeight: '700',
  color: '$neutral12',
  padding: '28px 24px',
  display: 'flex',
});

export function Thread(props: {
  threadId: string;
  style?: React.CSSProperties;
  showHeader?: boolean;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { threadId } = props;
  const { store, theme } = useApp();
  const userId = store.config.identify?.userId!;

  const [composerHeight, setComposerHeight] = useState(0);

  const { workspace, workspaceId } = useWorkspace();

  const { profiles, timeline, isConnected, isEmpty, target, ref, reactingId } = useThread({
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
            <div style={{ flex: '1' }}>Comments</div>
            <X style={{ marginTop: '2' }}></X>
          </StyledThreadHeader>
        ) : null}
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
              style={{
                borderTop: `1px solid ${theme.colors.borderColor.value.toString()}`,
              }}
              workspace={workspace}
              placeholder={isEmpty ? 'Add a comment' : 'Reply to this comment'}
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
