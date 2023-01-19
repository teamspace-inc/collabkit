import { fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const iconButtonWidth = fallbackVar(vars.iconButton.width, '24px');
export const iconButtonHeight = fallbackVar(vars.iconButton.height, '20px');

export const iconColor = fallbackVar(vars.iconButton.color, vars.color.icon);

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: iconButtonHeight,
    width: iconButtonWidth,
    cursor: 'pointer',
    userSelect: 'none',
    pointerEvents: 'all',
    borderRadius: fallbackVar(vars.iconButton.borderRadius, '4px'),
    color: fallbackVar(vars.iconButton.color, vars.color.icon),
    background: fallbackVar(vars.iconButton.background, 'transparent'),
    fontFamily: vars.fontFamily,
    
    selectors: {
      '&:hover': {
        background: fallbackVar(vars.iconButton.active.background, vars.color.surfaceOverlay),
      },
    },
  },
  variants: {
    active: {
      true: {
        background: fallbackVar(vars.iconButton.active.background, vars.color.surfaceOverlay),
      },
    },
  },
});
