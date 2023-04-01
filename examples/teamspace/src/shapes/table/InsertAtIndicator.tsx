import { blue } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { Z } from 'state/constants';

export const StyledInsertAtIndicator = styled('div', {
  position: 'absolute',
  background: blue.blue9,
  zIndex: Z.SYSTEM_MODAL,
  borderRadius: 11,

  variants: {
    orientation: {
      vertical: {
        top: -5.5,
        bottom: -5.5,
        borderRadius: 11,
        left: 0,
        width: 3,

        '&:after': {
          content: '',
          position: 'absolute',
          top: 1,
          bottom: 1,
          left: 1,
          width: 1,
          background: blue.blue10,
        },
      },
      horizontal: {
        left: -5.5,
        right: -5.5,
        top: 0,
        height: 3,

        '&:after': {
          content: '',
          position: 'absolute',
          left: 1,
          top: 1,
          bottom: 1,
          right: 1,
          width: 1,
          background: blue.blue10,
        },
      },
    },
  },
});

export function InsertAtIndicator(props: {
  x: number;
  y: number;
  orientation: 'vertical' | 'horizontal';
}) {
  return (
    <StyledInsertAtIndicator
      orientation={props.orientation}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
    />
  );
}
