import { recipe } from '@vanilla-extract/recipes';
import { vars } from './themes.css';

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
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
