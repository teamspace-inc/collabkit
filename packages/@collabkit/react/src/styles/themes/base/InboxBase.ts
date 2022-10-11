import { vars } from '../../theme';

export const InboxBase = {
  inbox: {
    gap: vars.space[2],
    width: '292px',
    background: vars.color.background,
    newIndicator: {
      color: 'white',
      fontSize: vars.text.tiny.fontSize,
      lineHeight: '16px',
      fontWeight: vars.fontWeight.bold,
      letterSpacing: vars.text.tiny.letterSpacing,
      inlay: {
        background: vars.color.attention,
      },
      line: {
        background: vars.color.border,
      },
    },
    item: {
      gap: 'initial',
      paddingTop: 'initial',
      paddingBottom: 'initial',
      paddingLeft: 'initial',
      paddingRight: 'initial',
      background: 'initial',
      borderBottom: 'initial',
      hover: {
        background: 'initial',
      },
      active: {
        background: 'initial',
      },
      replyCount: {
        letterSpacing: 'initial',
        fontWeight: 'initial',
        color: 'initial',
        fontSize: 'initial',
        lineHeight: 'initial',
      },
      unreadDot: {
        width: 'initial',
        height: 'initial',
        borderRadius: 'initial',
        background: 'initial',
      },
    },
  },
};
