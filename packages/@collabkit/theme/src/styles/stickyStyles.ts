import { css } from '@stitches/react';

export const container = css({
  position: 'absolute',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  variants: {
    zTop: {
      true: {
        zIndex: 9999,
      },
    },
  },
});
