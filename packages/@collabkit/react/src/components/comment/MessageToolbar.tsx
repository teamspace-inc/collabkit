import { styled } from '@stitches/react';
import { AddReactionButton } from './AddReactionButton';

const StyledMessageToolbar = styled('div', {
  position: 'absolute',
  display: 'flex',
  height: '100%',
  alignItems: 'flex-start',
  justifyContent: 'center',
  top: '4px',
  right: '10px',
  variants: {
    isVisible: {
      true: {
        pointerEvents: 'all',
        opacity: 1,
      },
      false: {
        pointerEvent: 'none',
        opacity: 0,
      },
    },
  },
});

export function MessageToolbar(props: { isVisible: boolean }) {
  return (
    <StyledMessageToolbar isVisible={props.isVisible}>
      <AddReactionButton />
    </StyledMessageToolbar>
  );
}
