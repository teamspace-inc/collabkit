import { vars } from '../../theme';

export const ButtonBase = {
  iconButton: {
    background: 'transparent',
    color: vars.color.icon,
    size: '24px',
    active: {
      background: vars.color.surfaceOverlay,
    },
    hover: {
      background: vars.color.surfaceOverlay,
    },
  },
  buttonGroup: {
    gap: vars.space[1],
    padding: `0px ${vars.space[4]} ${vars.space[4]}`,
  },
  button: {
    fontSize: vars.text.base.fontSize,
    lineHeight: vars.text.base.lineHeight,
    fontWeight: vars.fontWeights.regular,
    letterSpacing: vars.text.base.letterSpacing,
    borderRadius: vars.space[1],
    primary: {
      color: vars.color.textPrimary,
      background: 'transparent',
      letterSpacing: vars.button.letterSpacing,
      fontWeight: vars.fontWeights.bold,
      fontSize: vars.button.fontSize,
      lineHeight: vars.button.lineHeight,
      active: {
        color: vars.button.primary.color,
        background: vars.color.surfaceOverlay,
      },
      hover: {
        color: vars.button.primary.color,
        background: vars.color.surfaceOverlay,
      },
      disabled: {
        color: vars.button.disabled.color,
        background: vars.button.disabled.background,
      },
    },
    secondary: {
      color: vars.color.textSecondary,
      background: 'transparent',
      fontWeight: vars.button.fontWeight,
      letterSpacing: vars.button.letterSpacing,
      fontSize: vars.button.fontSize,
      lineHeight: vars.button.lineHeight,
      active: {
        color: vars.button.secondary.color,
        background: vars.color.surfaceOverlay,
      },
      hover: {
        color: vars.button.secondary.color,
        background: vars.color.surfaceOverlay,
      },
      disabled: {
        color: vars.button.disabled.color,
        background: vars.button.disabled.background,
      },
    },
    disabled: {
      color: vars.color.textDisabled,
      background: 'transparent',
    },
  },
};
