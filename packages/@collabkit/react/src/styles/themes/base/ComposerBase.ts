import { vars } from '../../theme';

export const ComposerBase = {
  composer: {
    caretColor: 'auto',
    color: vars.color.textPrimary,
    fontSize: vars.text.base.fontSize,
    lineHeight: vars.text.base.lineHeight,
    letterSpacing: vars.text.base.letterSpacing,
    fontWeight: vars.fontWeights.regular,
    padding: vars.space[2],
    //
    background: vars.color.surface,
    border: `0px solid ${vars.color.border}`,
    borderRadius: vars.space[1],
    hover: {
      background: vars.color.surface,
      border: `0px solid ${vars.color.border}`,
    },
    active: {
      background: vars.color.surface,
      border: `0px solid ${vars.color.border}`,
    },
    disabled: {
      background: vars.color.surface,
      border: `0px solid ${vars.color.border}`,
      color: vars.color.textSecondary,
    },
    placeholder: {
      color: vars.color.textSecondary,
    },
  },
};
