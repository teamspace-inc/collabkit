import { DeepPartial } from '@collabkit/core';
import { createGlobalTheme, createTheme, createGlobalThemeContract } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { MapLeafNodes } from './types';
import merge from 'deepmerge';
import { baseTheme } from './theme/BaseTheme';
import { profileTheme } from './theme/ProfileTheme';
import { scrollBarTheme } from './theme/ScrollbarTheme';
import { avatarTheme } from './theme/AvatarTheme';
import { facepileTheme } from './theme/FacepileTheme';
import { sidebarTheme } from './theme/SidebarTheme';
import { inboxTheme } from './theme/InboxTheme';
import { mentionsTheme } from './theme/MentionsTheme';
import { buttonTheme } from './theme/ButtonTheme';
import { commentTheme } from './theme/CommentTheme';
import { composerTheme } from './theme/ComposerTheme';
import { threadTheme } from './theme/ThreadTheme';
import { popoverThreadTheme } from './theme/PopoverThreadTheme';

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

export const vars = createGlobalThemeContract(
  {
    ...baseTheme,
    ...profileTheme,
    ...scrollBarTheme,
    ...avatarTheme,
    ...facepileTheme,
    ...sidebarTheme,
    ...inboxTheme,
    ...mentionsTheme,
    ...buttonTheme,
    ...commentTheme,
    ...composerTheme,
    ...threadTheme,
    ...popoverThreadTheme,
  },
  (value) => `collabkit-${value}`
);

export const defaultTheme = {
  color: {
    background: colors.white,
    surface: '#EEEEEE',
    surfaceOverlay: colors.opacity7,
    textPrimary: colors.black10,
    // TODO: use actual light mode colors, pending design
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
      fontWeight: vars.button.fontWeight,
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
  comment: {
    paddingTop: vars.space[2],
    paddingBottom: vars.space[2],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    hover: {
      background: 'unset',
    },
    header: {
      gap: vars.space[1],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
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
    menu: {
      background: vars.color.surface,
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
      fontWeight: vars.fontWeights.regular,
      active: {
        color: vars.comment.menu.color,
        background: vars.color.surfaceOverlay,
      },
    },
  },

  composer: {
    background: vars.color.surface,
    border: `1px solid ${colors.grey89}`,
    borderRadius: vars.space[1],
    body: {
      caretColor: 'auto',
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
      fontWeight: vars.fontWeights.regular,
      padding: vars.space[2],
    },
    placeholder: {
      color: vars.color.textSecondary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
      fontWeight: vars.fontWeights.regular,
    },
  },
  iconButton: {
    background: 'transparent',
    active: {
      background: colors.opacity7,
    },
    hover: {
      background: colors.opacity7,
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

export type Theme = MapLeafNodes<typeof vars, string>;
export type CustomTheme = Theme;

const darkTheme = {
  ...defaultTheme,
  color: {
    ...defaultTheme.color,
    background: colors.black13,
    surface: colors.grey24,
    surfaceOverlay: colors.opacity7,
    textPrimary: colors.white,
    textSecondary: colors.grey60,
  },
  composer: {
    ...defaultTheme.composer,
    border: 'none',
  },
  mentions: {
    ...defaultTheme.mentions,
    typeahead: {
      ...defaultTheme.mentions.typeahead,
      item: {
        ...defaultTheme.mentions.typeahead.item,
        email: {
          ...defaultTheme.mentions.typeahead.item.email,
          display: 'none',
        },
      },
    },
  },
};

const cashboardTheme: Theme = merge(defaultTheme, {
  avatar: {
    size: '32px',
    fontSize: '14px',
  },
  fontWeights: {
    bold: '600',
  },
  shadow: {
    standard: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    high: '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
  },
  button: {
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: '600',
    primary: {
      background: 'red',
      color: 'white',
    },
  },
  profile: {
    name: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '600',
    },
  },
  comment: {
    header: {
      gap: '12px',
      alignItems: 'center',
      justifyContent: 'center',
      profile: {
        alignItems: 'center',
        gap: '12px',
      },
      nameAndTimestamp: {
        gap: 0,
      },
    },

    timestamp: {
      fontSize: '12px',
      lineHeight: '18px',
      color: '#6A7278',
    },
    body: {
      fontSize: '14px',
      lineHeight: '22px',
    },
  },
  composer: {
    border: '1px solid red',
    background: 'white',
    borderRadius: '8px',
    body: {
      fontSize: '14px',
      lineHeight: '22.4px',
    },
  },
  mentions: {
    pill: {
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
  },
});

createGlobalTheme(':root', vars, defaultTheme);

export const dark = createTheme(vars, cashboardTheme);
// TODO: move to packages/@collabkit/custom-themes
