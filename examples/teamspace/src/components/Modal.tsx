import { styled } from '@stitches/react';

import { Z } from 'state/constants';

const ModalOverlay = styled('div', {
  position: 'absolute',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  zIndex: Z.PANE,
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

type ModalProps = { children: React.ReactNode; onClose: () => void };

export function Modal({ children, onClose }: ModalProps) {
  return (
    <ModalOverlay data-testid="Modal" onClick={onClose}>
      {children}
    </ModalOverlay>
  );
}
