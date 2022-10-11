import { fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: fallbackVar(vars.iconButton.size, '24px'),
    width: fallbackVar(vars.iconButton.size, '24px'),
    cursor: 'pointer',
    userSelect: 'none',
    pointerEvents: 'all',
    borderRadius: '4px',
    color: fallbackVar(vars.iconButton.color, vars.color.icon),
    background: fallbackVar(vars.iconButton.background, 'transparent'),

    selectors: {
      '&:active': {
        background: fallbackVar(vars.iconButton.active.background, vars.color.surfaceOverlay),
      },
      '&:hover': {
        background: fallbackVar(vars.iconButton.hover.background, vars.color.surfaceOverlay),
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