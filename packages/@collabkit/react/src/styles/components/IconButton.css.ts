import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';
export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: vars.iconButton.size,
    width: vars.iconButton.size,
    cursor: 'pointer',
    userSelect: 'none',
    pointerEvents: 'all',
    borderRadius: '4px',
    color: vars.color.textPrimary,
    background: vars.iconButton.background,

    selectors: {
      '&:active': {
        background: vars.iconButton.active.background,
      },
      '&:hover': {
        background: vars.iconButton.hover.background,
      },
    },
  },
  variants: {
    active: {
      true: {
        background: vars.iconButton.active.background,
      },
    },
  },
});
