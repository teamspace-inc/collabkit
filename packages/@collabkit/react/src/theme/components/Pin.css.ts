import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const pin = recipe({
  base: {
    position: 'absolute',
    width: '40px',
    height: '40px',
    marginLeft: '-20px',
    marginTop: '-40px',
    top: 0,
    left: 0,
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

export const pinIcon = style({});

export const pinAvatar = style({
  position: 'absolute',
  top: 5,
  left: 8,
});

export const pinThread = style({
  background: vars.color.background,
  borderRadius: '12px',
  width: 240,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.high,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const pinPreview = style({
  padding: `${vars.space[2]} ${vars.space[4]}`,
  cursor: 'pointer',
});
