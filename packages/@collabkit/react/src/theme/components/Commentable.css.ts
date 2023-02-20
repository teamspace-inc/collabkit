import { style } from '@vanilla-extract/css';

export const activeContainer = style({
  outlineOffset: '2px',
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
  backgroundColor: 'rgba(255, 255, 127, 0.5)',
  pointerEvents: 'none',
});
