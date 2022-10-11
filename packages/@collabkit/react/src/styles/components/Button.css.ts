import { fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: fallbackVar(vars.button.fontSize, vars.text.base.fontSize),
    fontWeight: fallbackVar(vars.button.fontWeight, vars.fontWeights.regular),
    letterSpacing: fallbackVar(vars.button.letterSpacing, vars.text.base.letterSpacing),
    lineHeight: fallbackVar(vars.button.lineHeight, vars.text.base.lineHeight),
    border: 'none',
    background: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    outline: 'none',
    borderRadius: fallbackVar(vars.button.borderRadius, '4px'),
  },

  variants: {
    type: {
      primary: {
        background: fallbackVar(vars.button.primary.background, vars.color.background),
        color: fallbackVar(vars.button.primary.color, vars.color.textPrimary),
        letterSpacing: fallbackVar(vars.button.primary.letterSpacing, vars.text.base.letterSpacing),
        fontWeight: fallbackVar(vars.button.primary.fontWeight, vars.fontWeights.bold),

        selectors: {
          '&:active': {
            background: fallbackVar(
              vars.button.primary.active.background,
              vars.color.surfaceOverlay
            ),
            color: fallbackVar(
              vars.button.primary.active.color,
              vars.button.primary.color,
              vars.color.textPrimary
            ),
          },
          '&:hover': {
            background: fallbackVar(
              vars.button.primary.hover.background,
              vars.color.surfaceOverlay
            ),
            color: fallbackVar(
              vars.button.primary.hover.color,
              vars.button.primary.color,
              vars.color.textPrimary
            ),
          },
        },
      },
      secondary: {
        background: fallbackVar(vars.button.secondary.background, 'transparent'),
        color: fallbackVar(vars.button.secondary.color, vars.color.textPrimary),
        letterSpacing: fallbackVar(
          vars.button.secondary.letterSpacing,
          vars.text.base.letterSpacing
        ),
        fontWeight: fallbackVar(vars.button.secondary.fontWeight, vars.fontWeights.medium),

        selectors: {
          '&:active': {
            background: fallbackVar(
              vars.button.secondary.active.background,
              vars.color.surfaceOverlay
            ),
            color: fallbackVar(
              vars.button.secondary.active.color,
              vars.button.secondary.color,
              vars.color.textSecondary
            ),
          },
          '&:hover': {
            background: fallbackVar(
              vars.button.secondary.active.background,
              vars.color.surfaceOverlay
            ),
            color: fallbackVar(
              vars.button.secondary.active.color,
              vars.button.secondary.color,
              vars.color.textSecondary
            ),
          },
        },
      },
    },
    disabled: {
      true: {
        // important to override hover and active styles above
        background: `${fallbackVar(vars.button.disabled.background, 'transparent')} !important`,
        color: `${fallbackVar(vars.button.disabled.color, vars.color.textDisabled)} !important`,
        cursor: 'default !important',
      },
    },
  },
});
