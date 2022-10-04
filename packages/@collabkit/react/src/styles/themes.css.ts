import { DeepPartial } from '@collabkit/core';
import { createGlobalTheme, createTheme, createGlobalThemeContract } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { MapLeafNodes } from './types';

const colors = {
  black10: 'hsl(0, 0%, 10%)', // Black 10
  black13: 'hsl(0, 0%, 13%)', // Black 13
  grey24: 'hsl(0, 0%, 24%)', // Grey 24
  grey30: 'hsl(0, 0%, 30%)', // Grey 30
  grey60: 'hsl(0, 0%, 60%)', // Grey 60
  grey73: 'hsl(0, 0%, 73%)', // Grey 73
  grey89: 'hsl(0, 0%, 89%, 1)',
  white: 'hsl(0, 0%, 100%)', // White
  opacity7: 'hsla(0, 0%, 100%, 0.08)', // White Opacity 7
  red: 'hsl(2, 73%, 62%)', // Red
};

export const vars = createGlobalThemeContract(
  {
    // Default colors
    color: {
      background: 'color-background',
      surface: 'color-surface',
      surfaceOverlay: 'color-surface-overlay',
      textPrimary: 'color-text-primary',
      textSecondary: 'color-text-secondary',
      textLink: 'color-text-link',
      border: 'color-border',
    },
    // Default spacing
    space: {
      0: 'space-0',
      1: 'space-1',
      2: 'space-2',
      3: 'space-3',
      4: 'space-4',
    },
    // Default typography
    text: {
      tiny: {
        fontSize: 'text-tiny-font-size',
        letterSpacing: 'text-tiny-letter-spacing',
        lineHeight: 'text-tiny-line-height',
      },
      small: {
        fontSize: 'text-small-font-size',
        letterSpacing: 'text-small-letter-spacing',
        lineHeight: 'text-small-line-height',
      },
      base: {
        fontSize: 'text-base-font-size',
        letterSpacing: 'text-base-letter-spacing',
        lineHeight: 'text-base-line-height',
      },
      large: {
        fontSize: 'text-large-font-size',
        letterSpacing: 'text-large-letter-spacing',
        lineHeight: 'text-large-line-height',
      },
    },
    fontWeights: {
      regular: 'font-weight-regular',
      medium: 'font-weight-medium',
      bold: 'font-weight-bold',
    },
    // Default shadows
    shadow: {
      standard: 'shadow-standard',
      high: 'shadow-high',
    },
    // Components
    scrollbar: {
      thumb: {
        background: 'scrollbar-thumb-background',
        width: 'scrollbar-thumb-width',
        borderRadius: 'scrollbar-thumb-border-radius',
      },
      padding: 'scrollbar-padding',
      background: 'scrollbar-background',
      hover: {
        background: 'scrollbar-hover-background',
      },
      borderRadius: 'scrollbar-border-radius',
    },

    avatar: {
      size: 'avatar-size',
    },

    facepile: {
      gap: 'facepile-gap',
      avatar: {
        size: 'facepile-avatar-size',
        borderSize: 'facepile-avatar-border-size',
        borderColor: 'facepile-avatar-border-color',
        hover: {
          borderColor: 'facepile-avatar-hover-border-color',
        },
      },
    },

    sidebar: {
      boxShadow: 'sidebar-box-shadow',
      background: 'sidebar-background',

      title: {
        fontSize: 'sidebar-title-font-size',
        fontWeight: 'sidebar-title-font-weight',
        letterSpacing: 'sidebar-title-letter-spacing',
        lineHeight: 'sidebar-title-line-height',

        borderBottom: 'sidebar-title-border-bottom',
        color: 'sidebar-title-color',
        paddingBottom: 'sidebar-title-padding-bottom',
        paddingTop: 'sidebar-title-padding-top',
      },
    },

    inbox: {
      gap: 'inbox-gap',
      background: 'inbox-background',
      width: 'inbox-width',

      item: {
        background: 'inbox-item-background',
        borderBottom: 'inbox-item-border-bottom',
        gap: 'inbox-item-gap',
        paddingTop: 'inbox-item-padding-top',
        paddingRight: 'inbox-item-padding-right',
        paddingLeft: 'inbox-item-padding-left',
        paddingBottom: 'inbox-item-padding-bottom',

        hover: {
          background: 'inbox-item-hover-background',
        },

        replyCount: {
          fontWeight: 'inbox-item-reply-count-font-weight',
          fontSize: 'inbox-item-reply-count-font-size',
          lineHeight: 'inbox-item-reply-count-line-height',
          letterSpacing: 'inbox-item-reply-count-letter-spacing',

          color: 'inbox-item-reply-count-color',
        },

        unreadDot: {
          width: 'inbox-item-unread-dot-width',
          height: 'inbox-item-unread-dot-height',
          borderRadius: 'inbox-item-unread-dot-border-radius',
          background: 'inbox-item-unread-dot-background',
        },
      },
    },

    mentions: {
      pill: {
        fontSize: 'mentions-pill-font-size',
        fontWeight: 'mentions-pill-font-weight',
        letterSpacing: 'mentions-pill-letter-spacing',
        lineHeight: 'mentions-pill-line-height',

        padding: 'mentions-pill-padding',
        color: 'mentions-pill-color',
        borderRadius: 'mentions-pill-border-radius',
        background: 'mentions-pill-background',
      },
      typeahead: {
        background: 'mentions-typeahead-background',
        border: 'mentions-typeahead-border',
        borderRadius: 'mentions-typeahead-border-radius',
        boxShadow: 'mentions-typeahead-box-shadow',
        padding: 'mentions-typeahead-padding',

        item: {
          fontSize: 'mentions-typeahead-item-font-size',
          fontWeight: 'mentions-typeahead-item-font-weight',
          letterSpacing: 'mentions-typeahead-item-letter-spacing',
          lineHeight: 'mentions-typeahead-item-line-height',

          padding: 'mentions-typeahead-item-padding',
          gap: 'mentions-typeahead-item-gap',
          color: 'mentions-typeahead-item-color',
          borderRadius: 'mentions-typeahead-item-border-radius',
          background: 'mentions-typeahead-item-background',

          hover: {
            background: 'mentions-typeahead-item-hover-background',
          },

          mark: {
            fontWeight: 'mentions-typeahead-item-mark-font-weight',
            color: 'mentions-typeahead-item-mark-color',
            background: 'mentions-typeahead-item-mark-background',
            borderRadius: 'mentions-typeahead-item-mark-border-radius',
          },

          active: {
            background: 'mentions-typeahead-item-active-background',
            color: 'mentions-typeahead-item-active-color',
          },

          nameAndEmailWrapper: {
            gap: 'mentions-typeahead-item-name-and-email-wrappper-gap',
            flexDirection: 'mentions-typeahead-item-name-and-email-wrappper-flex-direction',
          },

          name: {
            fontSize: 'mentions-typeahead-item-name-font-size',
            fontWeight: 'mentions-typeahead-item-name-font-weight',
            letterSpacing: 'mentions-typeahead-item-name-letter-spacing',
            lineHeight: 'mentions-typeahead-item-name-line-height',

            color: 'mentions-typeahead-item-name-color',
            active: {
              color: 'mentions-typeahead-item-name-active-color',
            },
          },

          email: {
            fontSize: 'mentions-typeahead-item-email-font-size',
            fontWeight: 'mentions-typeahead-item-email-font-weight',
            letterSpacing: 'mentions-typeahead-item-email-letter-spacing',
            lineHeight: 'mentions-typeahead-item-email-line-height',

            display: 'mentions-typeahead-item-email-display',
            color: 'mentions-typeahead-item-email-color',
            active: {
              color: 'mentions-typeahead-item-email-active-color',
            },
          },
        },
      },
    },

    button: {
      fontSize: 'button-font-size',
      fontWeight: 'button-font-weight',
      letterSpacing: 'button-letter-spacing',
      lineHeight: 'button-line-height',

      borderRadius: 'button-border-radius',
      primary: {
        letterSpacing: 'button-primary-letter-spacing',
        fontWeight: 'button-primary-font-weight',
        color: 'button-primary-color',
        background: 'button-primary-background',
        active: {
          color: 'button-primary-active-color',
          background: 'button-primary-active-background',
        },
        hover: {
          color: 'button-primary-hover-color',
          background: 'button-primary-hover-background',
        },
      },
      secondary: {
        fontWeight: 'button-secondary-font-weight',
        letterSpacing: 'button-secondary-letter-spacing',
        color: 'button-secondary-color',
        background: 'button-secondary-background',
        active: {
          color: 'button-secondary-active-color',
          background: 'button-secondary-active-background',
        },
        hover: {
          color: 'button-secondary-hover-color',
          background: 'button-secondary-hover-background',
        },
      },
      disabled: {
        color: 'button-disabled-color',
        background: 'button-disabled-background',
      },
    },
    comment: {
      paddingTop: 'comment-padding-top',
      paddingRight: 'comment-padding-right',
      paddingLeft: 'comment-padding-left',
      paddingBottom: 'comment-padding-bottom',
      hover: {
        background: 'comment-hover-background',
      },
      body: {
        color: 'comment-body-color',
        fontSize: 'comment-body-font-size',
        lineHeight: 'comment-body-line-height',
        fontWeight: 'comment-body-font-weight',
        letterSpacing: 'comment-body-letter-spacing',
      },
      timestamp: {
        color: 'comment-timestamp-color',
        fontSize: 'comment-timestamp-font-size',
        lineHeight: 'comment-timestamp-line-height',
        fontWeight: 'comment-timestamp-font-weight',
        letterSpacing: 'comment-timestamp-letter-spacing',
      },
      menu: {
        background: 'comment-menu-background',
        color: 'comment-menu-color',
        fontSize: 'comment-menu-font-size',
        lineHeight: 'comment-menu-line-height',
        fontWeight: 'comment-menu-font-weight',
        letterSpacing: 'comment-menu-letter-spacing',
        active: {
          background: 'comment-menu-active-background',
          color: 'comment-menu-active-color',
        },
      },
    },
    composer: {
      background: 'composer-background',
      border: 'composer-border',
      borderRadius: 'composer-border-radius',
      body: {
        caretColor: 'composer-caret-color',
        color: 'composer-color',
        fontSize: 'composer-font-size',
        lineHeight: 'composer-line-height',
        fontWeight: 'composer-font-weight',
        letterSpacing: 'composer-letter-spacing',
        padding: 'composer-body-padding',
      },
      placeholder: {
        color: 'composer-placeholder-color',
        fontSize: 'composer-placeholder-font-size',
        lineHeight: 'composer-placeholder-line-height',
        fontWeight: 'composer-placeholder-font-weight',
        letterSpacing: 'composer-placeholder-letter-spacing',
      },
    },
    iconButton: {
      background: 'icon-button-background',
      active: {
        background: 'icon-button-active-background',
      },
      hover: {
        background: 'icon-button-hover-background',
      },
    },
    newIndicator: {
      color: 'new-indicator-color',
      fontSize: 'new-indicator-font-size',
      fontWeight: 'new-indicator-font-weight',
      lineHeight: 'new-indicator-line-height',
      letterSpacing: 'new-indicator-letter-spacing',
      inlay: {
        background: 'new-indicator-inlay-background',
      },
      line: {
        background: 'new-indicator-line-background',
      },
    },
    popoverThread: {
      background: 'popover-thread-background',
      border: 'popover-thread-border',
      borderRadius: 'popover-thread-border-radius',
      boxShadow: 'popover-thread-box-shadow',
      width: 'popover-thread-width',
      preview: {
        boxShadow: 'popover-thread-preview-box-shadow',
      },
      composer: {
        borderTop: 'popover-thread-composer-border-top',
        alignItems: 'popover-thread-composer-align-items',
        padding: 'popover-thread-composer-padding',
        gap: 'popover-thread-composer-gap',
        contentEditable: {
          border: 'popover-thread-composer-content-editable-border',
          minHeight: 'popover-thread-composer-content-editable-min-height',
          focus: {
            border: 'popover-thread-composer-content-editable-focus-border',
          },
        },
      },
    },
    profile: {
      avatar: {
        width: 'profile-avatar-width',
        height: 'profile-avatar-height',
        borderRadius: 'profile-avatar-border-radius',
        fontSize: 'profile-avatar-font-size',
        fontWeight: 'profile-avatar-font-weight',
        color: 'profile-avatar-color',
        background: 'profile-avatar-background',
      },
      name: {
        color: 'profile-name-color',
        fontSize: 'profile-name-font-size',
        fontWeight: 'profile-name-font-weight',
        lineHeight: 'profile-name-line-height',
        letterSpacing: 'profile-name-letter-spacing',
      },
    },
    thread: {
      background: 'thread-background',
      border: 'thread-border',
      borderRadius: 'thread-border-radius',
      boxShadow: 'thread-box-shadow',
      header: {
        color: 'thread-header-color',
        fontSize: 'thread-header-font-size',
        fontWeight: 'thread-header-font-weight',
        lineHeight: 'thread-header-line-height',
        letterSpacing: 'thread-header-letter-spacing',
      },
      typingIndicator: {
        color: 'thread-typing-indicator-color',
        fontSize: 'thread-typing-indicator-font-size',
        lineHeight: 'thread-typing-indicator-line-height',
        fontWeight: 'thread-typing-indicator-font-weight',
        letterSpacing: 'thread-typing-indicator-letter-spacing',
      },
    },
  },
  (value) => `collabkit-${value}`
);

export const defaultTheme = {
  color: {
    background: colors.white,
    surface: colors.white,
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
    high: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    size: '24px',
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
      letterSpacing: vars.text.base.letterSpacing,
      fontWeight: vars.fontWeights.bold,
      active: {
        color: vars.button.primary.color,
        background: vars.button.primary.background,
      },
      hover: {
        color: vars.button.primary.color,
        background: colors.opacity7,
      },
    },
    secondary: {
      color: vars.color.textSecondary,
      background: 'transparent',
      fontWeight: vars.fontWeights.regular,
      letterSpacing: vars.text.base.letterSpacing,
      active: {
        color: vars.button.secondary.color,
        background: vars.button.secondary.background,
      },
      hover: {
        color: vars.button.secondary.color,
        background: vars.button.secondary.background,
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
  comment: {
    paddingTop: vars.space[2],
    paddingBottom: vars.space[2],
    paddingLeft: vars.space[4],
    paddingRight: vars.space[4],
    hover: {
      background: 'unset',
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
  profile: {
    avatar: {
      width: '24px',
      height: vars.profile.avatar.width,
      borderRadius: '50%',
      fontSize: vars.text.small.fontSize,
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

createGlobalTheme(':root', vars, defaultTheme);

export const dark = createTheme(vars, darkTheme);
// TODO: move to packages/@collabkit/custom-themes
