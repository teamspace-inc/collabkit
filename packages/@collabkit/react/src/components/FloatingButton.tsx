import React from 'react';
import { ChatText, X } from 'phosphor-react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { styled } from '@stitches/react';
import { floatingButtonStyles } from '@collabkit/theme';

const StyledFloatingButtonContainer = styled('div', floatingButtonStyles.container);
const StyledFloatingButton = styled('div', floatingButtonStyles.button);

export function FloatingButton(props: { style?: React.CSSProperties }) {
  const { store, events, theme } = useApp();
  const { uiState } = useSnapshot(store);
  const target = { type: 'floatingCommentButton' } as const;
  return (
    <>
      <StyledFloatingButtonContainer style={props.style} data-collabkit-internal="true">
        {/* <Badge size={20} number={1}></Badge> */}
        <StyledFloatingButton
          // animate={{ scale: [0.8, 1.1, 1] }}
          // transition={{ duration: 0.5 }}
          onPointerDown={(e) => events.onPointerDown(e, { target })}
        >
          {uiState === 'selecting' ? (
            <X weight="fill" color={theme.colors.neutral8.toString()} size={28} />
          ) : (
            <ChatText
              weight="fill"
              color={theme.colors.neutral12.toString()}
              size={32}
              style={{ margin: '-2px 0px 0px 0px' }}
            />
          )}
        </StyledFloatingButton>
      </StyledFloatingButtonContainer>
    </>
  );
}
//
