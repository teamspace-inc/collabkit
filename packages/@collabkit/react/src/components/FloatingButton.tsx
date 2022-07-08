import { styled, theme } from './UIKit';
import { ChatText, X } from 'phosphor-react';
import { useSnapshot } from 'valtio';
import { useApp } from './App';
import { Cursor } from './Cursor';
import { motion } from 'framer-motion';

const StyledFloatingButtonContainer = styled('div', {
  position: 'fixed',
  right: 20,
  bottom: 20,
});

const StyledFloatingButton = styled(motion.div, {
  background: '$neutral12',
  cursor: 'pointer',
  width: 60,
  borderRadius: 60,
  height: 60,
  display: 'flex',
  userSelect: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 1px 6px 0 rgb(0 0 0 / 6%), 0 2px 32px 0 rgb(0 0 0 / 16%)',
  variants: {
    uiState: {
      selecting: {},
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
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          uiState={uiState}
          onPointerDown={(e) => events.onPointerDown(e, { target })}
        >
          {uiState === 'selecting' ? (
            <X weight="fill" color={theme.colors.neutral6.toString()} size={35} />
          ) : (
            <ChatText
              weight="fill"
              color={theme.colors.neutral2.toString()}
              size={35}
              style={{ margin: '-2px 0px 0px 0px' }}
            />
          )}
        </StyledFloatingButton>
      </StyledFloatingButtonContainer>
    </>
  );
}
