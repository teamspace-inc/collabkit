import { vars } from '../../theme';

export const ThreadBase = {
  thread: {
    background: vars.color.background,
    border: 'none',
    borderRadius: vars.space[3],
    boxShadow: 'none',
    header: {
      color: vars.color.textPrimary,
      fontSize: vars.text.large.fontSize,
      fontWeight: vars.fontWeights.bold,
      lineHeight: vars.text.large.lineHeight,
      letterSpacing: vars.text.large.letterSpacing,
    },
    typingIndicator: {
      color: vars.color.textSecondary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.space[4],
      fontWeight: vars.fontWeights.regular,
      letterSpacing: vars.text.base.letterSpacing,
    },
  },
};
