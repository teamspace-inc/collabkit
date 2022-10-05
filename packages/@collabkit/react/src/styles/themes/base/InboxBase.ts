import { vars } from '../../theme';

export const InboxBase = {
  inbox: {
    gap: vars.space[2],
    width: '292px',
    background: vars.color.background,
    newIndicator: {
      color: vars.color.textPrimary,
      fontSize: vars.text.tiny.fontSize,
      lineHeight: '16px',
      fontWeight: vars.fontWeights.bold,
      letterSpacing: vars.text.tiny.letterSpacing,
      inlay: {
        background: vars.color.attention,
      },
      line: {
        background: vars.color.border,
      },
    },
    item: {
      gap: vars.space[2],
      paddingTop: vars.space[4],
      paddingBottom: vars.space[4],
      paddingLeft: vars.space[4],
      paddingRight: vars.space[4],
      background: vars.color.surface,
      borderBottom: '0px solid transparent',
      hover: {
        background: vars.color.surface,
      },
      active: {
        background: vars.color.surface,
      },
      replyCount: {
        letterSpacing: vars.text.small.letterSpacing,
        fontWeight: vars.fontWeights.regular,
        color: vars.color.textSecondary,
        fontSize: vars.text.small.fontSize,
        lineHeight: vars.text.small.lineHeight,
      },
      unreadDot: {
        width: vars.space[2],
        height: vars.space[2],
        borderRadius: '50%',
        background: vars.color.attention,
      },
    },
  },
};
