import React from 'react';
import { styled, theme } from './UIKit';
import { ChatText, X } from 'phosphor-react';
import { useSnapshot } from 'valtio';
import { useApp } from './Provider';
import { Cursor } from './Cursor';
import { motion } from 'framer-motion';

const StyledFloatingButtonContainer = styled('div', {
  position: 'fixed',
  right: 20,
  bottom: 20,
});

const StyledFloatingButton = styled(motion.div, {
  background: '$colors$primaryButtonBackground',
  cursor: 'pointer',
  width: 60,
  borderRadius: 60,
  height: 60,
  display: 'flex',
  userSelect: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 1px 6px 0 rgb(0 0 0 / 5%), 0 2px 32px 0 rgb(0 0 0 / 12%)',
  variants: {
    uiState: {
      selecting: {},
      idle: {},
      commenting: {},
      viewing: {},
      composing: {},
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
