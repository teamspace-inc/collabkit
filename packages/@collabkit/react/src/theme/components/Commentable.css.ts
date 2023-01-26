import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
  // pointerEvents: 'none',
});

export const pin = recipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(0, 0)',
    width: '40px',
    height: '40px',
    marginLeft: '-20px',
    marginTop: '-40px',
  },
  variants: {
    pointerEvents: {
      none: {
        pointerEvents: 'none',
      },
      all: {
        pointerEvents: 'all',
      },
    },
    isSelected: {
      true: {},
      false: {},
    },
  },
});

export const pinAvatar = style({
  position: 'absolute',
  top: 5,
  left: 8,
});
