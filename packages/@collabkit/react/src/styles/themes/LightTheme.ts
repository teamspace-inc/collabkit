import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';
import { CommentLightTheme } from './light/CommentLightTheme';

const colors = {
  black10: 'hsl(0, 0%, 10%)', // Black 10
  black13: 'hsl(0, 0%, 13%)', // Black 13
  grey24: 'hsl(0, 0%, 24%)', // Grey 24
  grey30: 'hsl(0, 0%, 30%)', // Grey 30
  grey60: 'hsl(0, 0%, 60%)', // Grey 60
  grey73: 'hsl(0, 0%, 73%)', // Grey 73
  grey89: 'hsl(0, 0%, 89%, 1)',
  white: 'hsl(0, 0%, 100%)', // White
  opacity7: 'rgba(0, 0, 0, 0.08)', // White Opacity 7
  red: 'hsl(2, 73%, 62%)', // Red
};

export const LightTheme = {
  color: {
    background: colors.white,
    surface: '#EEEEEE',
    surfaceOverlay: colors.opacity7,
    textPrimary: colors.black10,
    textSecondary: colors.grey30,
    textLink: colors.black10,
    border: colors.opacity7,
  },

  space: {
    0: '0px',
    1: '4px',
    2: calc.multiply(vars.space[1], 2),
    3: calc.multiply(vars.space[1], 3),
    4: calc.multiply(vars.space[1], 4),
  },

  text: {
    tiny: { fontSize: '9px', lineHeight: '11px', letterSpacing: '0px' },
    small: { fontSize: '11px', lineHeight: '13px', letterSpacing: '0px' },
    base: { fontSize: '13px', lineHeight: '18px', letterSpacing: '0px' },
    large: { fontSize: '14px', lineHeight: '17px', letterSpacing: '0px' },
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },

  shadow: {
    standard: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    high: '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
  },

  avatar: {
    size: '24px',
    fontSize: '12px',
  },

  facepile: {
    gap: calc.negate('4px'),
    avatar: {
      size: vars.avatar.size,
      borderSize: '2px',
      borderColor: vars.color.background,
      hover: {
        borderColor: vars.color.surface,
      },
    },
  },

  scrollbar: {
    thumb: {
      background: colors.grey30,
      width: '6px',
      borderRadius: '12px',
    },
    padding: '4px',
    background: 'transparent',
    hover: {
      background: colors.opacity7,
    },
    borderRadius: '0px 3px 3px 0px',
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
      color: vars.color.textSecondary,
      background: 'transparent',
    },
  },

  sidebar: {
    boxShadow: vars.shadow.high,
    background: vars.color.background,
    title: {
      fontSize: vars.text.large.fontSize,
      lineHeight: vars.text.large.lineHeight,
      letterSpacing: vars.text.large.letterSpacing,
      color: vars.color.textPrimary,
      fontWeight: vars.fontWeights.bold,
      paddingTop: vars.space[4],
      paddingBottom: vars.space[2],
      borderBottom: `none`,
    },
  },

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
        background: colors.red,
      },
      line: {
        background: colors.grey30,
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
        background: colors.red,
      },
    },
  },

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
          background: colors.opacity7,
          color: vars.color.textPrimary,
        },
        hover: {
          background: colors.opacity7,
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
            color: colors.black10,
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
            color: colors.black10,
          },
        },
      },
    },
  },

  profile: {
    avatar: {
      width: vars.avatar.size,
      height: vars.avatar.size,
      borderRadius: '50%',
      fontSize: vars.avatar.fontSize,
      color: vars.color.background,
      background: colors.grey60,
      fontWeight: vars.fontWeights.bold,
    },

    name: {
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      fontWeight: vars.fontWeights.bold,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
    },
  },
  ...CommentLightTheme,

  menu: {
    background: vars.color.surface,
    border: 'none',
    borderRadius: '6px',
    boxShadow: vars.shadow.standard,
    item: {
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      fontWeight: vars.fontWeights.regular,
      letterSpacing: vars.text.base.letterSpacing,
      lineHeight: vars.text.base.lineHeight,
      active: {
        color: vars.color.textPrimary,
        background: vars.color.surfaceOverlay,
      },
      hover: {
        color: vars.color.textPrimary,
        background: vars.color.surfaceOverlay,
      },
    },
  },

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
    border: `1px solid ${vars.color.border}`,
    borderRadius: vars.space[1],
    hover: {
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
    },
    active: {
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
    },
    disabled: {
      background: vars.color.surface,
      border: `1px solid ${vars.color.border}`,
      color: vars.color.textSecondary,
    },
    placeholder: {
      color: vars.color.textSecondary,
    },
  },

  iconButton: {
    background: 'transparent',
    color: colors.grey89,
    size: '24px',
    active: {
      background: vars.color.surfaceOverlay,
    },
    hover: {
      background: vars.color.surfaceOverlay,
    },
  },

  popoverThread: {
    background: vars.color.background,
    border: 'none',
    borderRadius: vars.space[3],
    boxShadow: vars.shadow.high,
    width: '264px', // make this customisable
    preview: {
      boxShadow: vars.shadow.standard,
    },
    composer: {
      borderTop: `1px solid ${vars.color.border}`,
      alignItems: 'flex-end',
      padding: `${vars.space[4]} ${vars.space[4]} ${vars.space[4]} ${vars.space[4]}`,
      gap: vars.space[2],
      contentEditable: {
        border: `1px solid ${vars.color.border}`,
        minHeight: '40px',
        focus: {
          border: `1px solid ${vars.color.border}`,
        },
      },
    },
  },

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
