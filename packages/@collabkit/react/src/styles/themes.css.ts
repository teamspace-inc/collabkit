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
    width: '264px',
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
