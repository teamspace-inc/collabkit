import { globalStyle, style } from '@vanilla-extract/css';

export const selecting = style({
  cursor: 'none !important',
});
globalStyle(`${selecting} *`, {
  cursor: 'none !important',
});

export const overlay = style({
  position: 'absolute',
  pointerEvents: 'none',
});
