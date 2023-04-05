import { globalStyle, style } from '@vanilla-extract/css';

export const selecting = style({
  cursor: 'none !important',
});
globalStyle(`${selecting} *`, {
  cursor: 'none !important',
});

export const cursor = style({
  position: 'absolute',
  width: 24,
  height: 24,
  background: 'yellow',
  pointerEvents: 'none',
});

export const overlay = style({
  position: 'absolute',
  pointerEvents: 'none',
});
