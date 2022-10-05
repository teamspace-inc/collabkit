import { vars } from '../../theme';

export const CommentBase = {
  comment: {
    paddingTop: vars.space[2],
    paddingBottom: vars.space[2],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    hover: {
      background: 'unset',
    },
    header: {
      gap: vars.space[2],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      nameAndTimestamp: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        gap: vars.space[1],
      },
      profile: {
        gap: vars.space[2],
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    content: {
      gap: vars.space[2],
    },
    body: {
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
      fontWeight: vars.fontWeights.regular,
    },
    timestamp: {
      color: vars.color.textSecondary,
      fontSize: vars.text.small.fontSize,
      lineHeight: vars.text.small.lineHeight,
      letterSpacing: vars.text.small.letterSpacing,
      fontWeight: vars.fontWeights.regular,
    },
  },
};
