import { styled, theme } from './UIKit';
import { Chat } from 'phosphor-react';
import { useSnapshot } from 'valtio';
import { useApp } from './App';
import { Cursor } from './Cursor';

const StyledFloatingButtonContainer = styled('div', {
  position: 'fixed',
  right: 20,
  bottom: 20,
});

const StyledFloatingButton = styled('div', {
  background: '$accent10',
  cursor: 'pointer',
  width: 60,
  borderRadius: 60,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 1px 6px 0 rgb(0 0 0 / 6%), 0 2px 32px 0 rgb(0 0 0 / 16%)',
  variants: {
    uiState: {
      selecting: {
        background: 'red',
      },
      idle: {},
      commenting: {},
    },
  },
});

export function FloatingButton() {
  const { store, events } = useApp();
  const { uiState } = useSnapshot(store);
  const target = { type: 'floatingCommentButton' } as const;
  return (
    <>
      <Cursor />
      <StyledFloatingButtonContainer>
        <StyledFloatingButton
          uiState={uiState}
          onPointerDown={(e) => events.onPointerDown(e, { target })}
        >
          <Chat
            weight="fill"
            color={theme.colors.accent1.toString()}
            size={40}
            style={{ margin: '-1px 0px 0px -1px' }}
          />
        </StyledFloatingButton>
      </StyledFloatingButtonContainer>
    </>
  );
}
