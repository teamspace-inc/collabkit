import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

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

export const pinPreview = style({
  background: vars.color.background,
  borderRadius: '12px',
  padding: `${vars.space[3]} ${vars.space[3]}`,
  width: 200,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.high,
});
