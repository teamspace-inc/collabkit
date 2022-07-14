import { FlexCenter, styled, theme } from './UIKit';
import { IconContext, ChatCircle } from 'phosphor-react';
import React, { useState } from 'react';
import { Composer } from './Composer';
import { useWorkspace } from '../hooks/useWorkspace';
import { ScrollableCommentList } from './ScrollableCommentList';
import { useApp } from './Provider';
import { useThread } from './useThread';
import { StyledThread } from './thread/StyledThread';

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

// export const MODAL_Z_INDEX = 999999;

export function Thread(props: {
  threadId: string;
  style?: React.CSSProperties;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}) {
  const { threadId } = props;
  const { store, events } = useApp();
  const userId = store.config.identify?.userId!;

  const [composerHeight, setComposerHeight] = useState(0);

  const { workspace, workspaceId } = useWorkspace();

  const { profiles, timeline, isConnected, isResolved, isEmpty, target, ref, reactingId } =
    useThread({
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
        background: 'white',
        borderRadius: 11,
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
      ) : null}
      <StyledThread isEmpty={isEmpty}>
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
              type={'inline'}
              profiles={profiles}
              threadId={props.threadId}
              userId={userId}
              workspaceId={workspaceId}
              composerHeight={composerHeight}
              headerHeight={0}
              timeline={timeline}
            />
          )}
          {workspaceId && workspace ? (
            <Composer
              // style={
              //   isEmpty && props.type === 'popout'
              //     ? {}
              //     : { position: 'absolute', bottom: 0, left: 0, right: 0 }
              // }
              workspace={workspace}
              placeholder={isEmpty ? 'Add a comment' : 'Reply to this comment'}
              workspaceId={workspaceId}
              onHeightChange={setComposerHeight}
              threadType={'inline'}
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
