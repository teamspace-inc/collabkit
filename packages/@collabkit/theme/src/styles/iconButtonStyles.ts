import { css } from '@stitches/react';

export const button = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 32,
  cursor: 'pointer',
  pointerEvents: 'all',

  // temp fix for popover thread scrollbar clash
  zIndex: 2,

  '&:hover': {
    cursor: 'pointer',
  },
});
