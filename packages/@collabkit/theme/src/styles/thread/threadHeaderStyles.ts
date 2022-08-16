import { css } from '@stitches/react';

export const root = css({
  height: 30,
  display: 'flex',
  gap: 0,
  padding: '2px 0px',
  alignItems: 'center',
  pointerEvents: 'none',
  borderBottom: '1px solid $borderColor',
});

export const leftGroup = css({
  display: 'flex',
  flexGrow: 1,
  gap: 0,
});
