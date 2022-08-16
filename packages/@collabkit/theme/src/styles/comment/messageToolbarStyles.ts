import { css } from '@stitches/react';

export const toolbar = css({
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
