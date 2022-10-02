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
        lineHeight: 'text-tiny-line-height',
      },
      small: {
        fontSize: 'text-small-font-size',
        lineHeight: 'text-small-line-height',
      },
      base: {
        fontSize: 'text-base-font-size',
        lineHeight: 'text-base-line-height',
      },
      large: {
        fontSize: 'text-large-font-size',
        lineHeight: 'text-large-line-height',
      },
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

    mentions: {
      pill: {
        fontWeight: 'mentions-pill-font-weight',
        fontSize: 'mentions-pill-font-size',
        lineHeight: 'mentions-pill-line-height',
        color: 'mentions-pill-color',
        background: 'mentions-pill-background',
        borderRadius: 'mentions-pill-border-radius',
        padding: 'mentions-pill-padding',
      },
      typeahead: {
        background: 'mentions-typeahead-background',
        border: 'mentions-typeahead-border',
        borderRadius: 'mentions-typeahead-border-radius',
        boxShadow: 'mentions-typeahead-box-shadow',
        padding: 'mentions-typeahead-padding',

        item: {
          borderRadius: 'mentions-typeahead-item-border-radius',
          fontSize: 'mentions-typeahead-item-font-size',
          fontWeight: 'mentions-typeahead-item-font-weight',
          lineHeight: 'mentions-typeahead-item-line-height',
          background: 'mentions-typeahead-item-background',
          padding: 'mentions-typeahead-item-padding',
          color: 'mentions-typeahead-item-color',
          gap: 'mentions-typeahead-item-gap',

          hover: {
            background: 'mentions-typeahead-item-hover-background',
          },

          mark: {
            color: 'mentions-typeahead-item-mark-color',
            fontWeight: 'mentions-typeahead-item-mark-font-weight',
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
            fontWeight: 'mentions-typeahead-item-name-font-weight',
            lineHeight: 'mentions-typeahead-item-name-line-height',
            fontSize: 'mentions-typeahead-item-name-font-size',
            color: 'mentions-typeahead-item-name-color',
            active: {
              color: 'mentions-typeahead-item-name-active-color',
            },
          },

          email: {
            display: 'mentions-typeahead-item-email-display',
            fontWeight: 'mentions-typeahead-item-email-font-weight',
            lineHeight: 'mentions-typeahead-item-email-line-height',
            fontSize: 'mentions-typeahead-item-email-font-size',
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
      lineHeight: 'button-line-height',
      borderRadius: 'button-border-radius',
      primary: {
        color: 'button-primary-color',
        background: 'button-primary-background',
        fontWeight: 'button-primary-font-weight',
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
        color: 'button-secondary-color',
        background: 'button-secondary-background',
        fontWeight: 'button-secondary-font-weight',
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
      paddingBottom: 'comment-padding-bottom',
      paddingLeft: 'comment-padding-left',
      paddingRight: 'comment-padding-right',
      hover: {
        background: 'comment-hover-background',
      },

      body: {
        color: 'comment-body-color',
        fontSize: 'comment-body-font-size',
        lineHeight: 'comment-body-line-height',
      },
      timestamp: {
        color: 'comment-timestamp-color',
        fontSize: 'comment-timestamp-font-size',
        lineHeight: 'comment-timestamp-line-height',
      },
      menu: {
        background: 'comment-menu-background',
        color: 'comment-menu-color',
        fontSize: 'comment-menu-font-size',
        lineHeight: 'comment-menu-line-height',
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
        padding: 'composer-body-padding',
      },
      placeholder: {
        color: 'composer-placeholder-color',
        fontSize: 'composer-placeholder-font-size',
        lineHeight: 'composer-placeholder-line-height',
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
        color: 'profile-avatar-color',
      },
      name: {
        color: 'profile-name-color',
        fontSize: 'profile-name-font-size',
        fontWeight: 'profile-name-font-weight',
        lineHeight: 'profile-name-line-height',
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
      },
      typingIndicator: {
        color: 'thread-typing-indicator-color',
        fontSize: 'thread-typing-indicator-font-size',
        lineHeight: 'thread-typing-indicator-line-height',
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
  },
  space: {
    0: '0px',
    1: '4px',
    2: calc.multiply(vars.space[1], 2),
    3: calc.multiply(vars.space[1], 3),
    4: calc.multiply(vars.space[1], 4),
  },
  text: {
    tiny: { fontSize: '9px', lineHeight: '11px' },
    small: { fontSize: '11px', lineHeight: '13px' },
    base: { fontSize: '13px', lineHeight: '18px' },
    large: { fontSize: '14px', lineHeight: '17px' },
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
    borderRadius: vars.space[1],
    primary: {
      color: vars.color.textPrimary,
      background: 'transparent',
      fontWeight: '700',
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
      fontWeight: '400',
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
  mentions: {
    pill: {
      fontWeight: '700',
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
      color: colors.black10,
      background: colors.grey30,
      borderRadius: '6px',
      padding: '0',
    },

    typeahead: {
      background: vars.color.surface,
      border: '1px solid #E0E0E0',
      borderRadius: '6px',
      boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.25)',
      padding: '0',

      item: {
        borderRadius: vars.space[1],
        fontSize: vars.text.base.fontSize,
        fontWeight: '400',
        lineHeight: vars.text.base.lineHeight,
        background: vars.color.surface,
        padding: vars.space[2],
        color: vars.color.textPrimary,
        gap: vars.space[2],

        mark: {
          color: 'inherit',
          fontWeight: '700',
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
          fontSize: vars.text.large.fontSize,
          lineHeight: vars.text.large.lineHeight,
          fontWeight: '700',
          active: {
            color: colors.black10,
          },
        },

        email: {
          display: 'inherit',
          color: vars.color.textSecondary,
          fontSize: vars.text.small.fontSize,
          lineHeight: vars.text.small.lineHeight,
          fontWeight: '400',
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
    },
    timestamp: {
      color: vars.color.textSecondary,
      fontSize: vars.text.small.fontSize,
      lineHeight: vars.text.small.lineHeight,
    },
    menu: {
      background: vars.color.surface,
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
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
      padding: vars.space[2],
    },
    placeholder: {
      color: vars.color.textSecondary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.text.base.lineHeight,
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
    fontWeight: '700',
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
    boxShadow: 'none',
    width: '264px', // make this customisable
    composer: {
      borderTop: `1px solid ${colors.opacity7}`,
      alignItems: 'flex-end',
      padding: `${vars.space[4]} ${vars.space[4]} ${vars.space[4]} ${vars.space[4]}`,
      gap: vars.space[3],
      contentEditable: {
        border: `1px solid ${colors.grey24}`,
        minHeight: '40',
        focus: {
          border: `1px solid ${colors.grey24}`,
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
    },
    name: {
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      fontWeight: '700',
      lineHeight: vars.text.base.lineHeight,
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
      fontWeight: '700',
      lineHeight: vars.text.large.lineHeight,
    },
    typingIndicator: {
      color: vars.color.textSecondary,
      fontSize: vars.text.base.fontSize,
      lineHeight: vars.space[4],
    },
  },
};

export type Theme = MapLeafNodes<typeof vars, string>;
export type CustomTheme = DeepPartial<Theme>;

const darkTheme = {
  ...defaultTheme,
  color: {
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
};

createGlobalTheme(':root', vars, defaultTheme);

export const dark = createTheme(vars, darkTheme);
// TODO: move to packages/@collabkit/custom-themes
