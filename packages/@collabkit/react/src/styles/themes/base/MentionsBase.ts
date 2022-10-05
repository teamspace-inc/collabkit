import { vars } from '../../theme';

export const MentionsBase = {
  mentions: {
    pill: {
      fontWeight: vars.fontWeights.bold,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
      // todo make these use text colors
      color: vars.color.textPrimary,
      background: 'transparent',
      borderRadius: '0px',
      padding: '0',
    },

    typeahead: {
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      borderRadius: '6px',
      boxShadow: vars.shadow.standard,
      padding: '0',
      item: {
        borderRadius: vars.space[1],
        fontSize: vars.text.base.fontSize,
        fontWeight: vars.fontWeights.regular,
        letterSpacing: vars.text.base.letterSpacing,
        lineHeight: vars.text.base.lineHeight,
        background: vars.color.surface,
        padding: vars.space[2],
        color: vars.color.textPrimary,
        gap: vars.space[2],
        mark: {
          color: 'inherit',
          fontWeight: vars.fontWeights.bold,
          background: 'transparent',
          borderRadius: '0',
        },
        active: {
          background: vars.color.surfaceOverlay,
          color: vars.color.textPrimary,
        },
        hover: {
          background: vars.color.surfaceOverlay,
        },
        nameAndEmailWrapper: {
          gap: vars.space[1],
          flexDirection: 'column',
        },
        name: {
          color: vars.color.textPrimary,
          fontSize: vars.text.base.fontSize,
          lineHeight: vars.text.base.lineHeight,
          fontWeight: vars.fontWeights.bold,
          letterSpacing: vars.text.base.letterSpacing,
          active: {
            color: vars.color.textPrimary,
          },
        },
        email: {
          display: 'inherit',
          color: vars.color.textSecondary,
          fontSize: vars.text.small.fontSize,
          lineHeight: vars.text.small.lineHeight,
          fontWeight: vars.fontWeights.regular,
          letterSpacing: vars.text.small.letterSpacing,
          active: {
            color: vars.color.textPrimary,
          },
        },
      },
    },
  },
};
