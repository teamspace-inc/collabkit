import { recipe } from '@vanilla-extract/recipes';
import { vars } from './themes.css';

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: vars.button.fontSize,
    fontWeight: vars.button.fontWeight,
    letterSpacing: vars.button.letterSpacing,
    lineHeight: vars.button.lineHeight,
    border: 'none',
    background: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    outline: 'none',
    borderRadius: '4px',
  },

  variants: {
    type: {
      primary: {
        background: vars.button.primary.background,
        color: vars.button.primary.color,
        letterSpacing: vars.button.primary.letterSpacing,
        fontWeight: vars.button.primary.fontWeight,

        selectors: {
          '&:active': {
            background: vars.button.primary.active.background,
            color: vars.button.primary.active.color,
          },
          '&:hover': {
            background: vars.button.primary.hover.background,
            color: vars.button.primary.hover.color,
          },
        },
      },
      secondary: {
        background: vars.button.secondary.background,
        color: vars.button.secondary.color,
        letterSpacing: vars.button.secondary.letterSpacing,
        fontWeight: vars.button.secondary.fontWeight,

        selectors: {
          '&:active': {
            background: vars.button.secondary.active.background,
            color: vars.button.secondary.active.color,
          },
          '&:hover': {
            background: vars.button.secondary.hover.background,
            color: vars.button.secondary.hover.color,
          },
        },
      },
    },
    disabled: {
      true: {
        background: `${vars.button.disabled.background} !important`,
        color: `${vars.button.disabled.color} !important`,
      },
    },
  },
});
