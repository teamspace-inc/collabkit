import merge from 'deepmerge';
import { BaseTheme } from './BaseTheme';

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

export const DarkTheme = merge(BaseTheme, {
  color: {
    background: colors.black13,
    surface: colors.grey24,
    surfaceOverlay: colors.opacity7,
    textPrimary: colors.white,
    textSecondary: colors.grey60,
    textDisabled: colors.grey24,
    border: colors.opacity7,
    icon: colors.grey73,
  },
  composer: {},
  mentions: {
    typeahead: {
      item: {
        email: {
          display: 'none',
        },
      },
    },
  },
  avatar: {
    colors: {
      amber: 'hsla(41, 95%, 66%, 1)',
      blue: 'hsla(211, 94%, 62%, 1)',
      brown: 'hsla(28, 36%, 54%, 1)',
      crimson: 'hsla(342, 70%, 62%, 1)',
      cyan: 'hsla(192, 55%, 50%, 1)',
      grass: 'hsla(124, 30%, 53%, 1)',
      green: 'hsla(146, 34%, 49%, 1)',
      indigo: 'hsla(225, 70%, 59%, 1)',
      lime: 'hsla(74, 78%, 64%, 1)',
      mint: 'hsla(162, 71%, 78%, 1)',
      orange: 'hsla(23, 90%, 60%, 1)',
      pink: 'hsla(325, 60%, 59%, 1)',
      plum: 'hsla(291, 43%, 55%, 1)',
      purple: 'hsla(268, 50%, 58%, 1)',
      red: 'hsla(2, 73%, 62%, 1)',
      sky: 'hsla(194, 96%, 78%, 1)',
      teal: 'hsla(173, 45%, 46%, 1)',
      tomato: 'hsla(11, 71%, 58%, 1)',
      violet: 'hsla(11, 71%, 58%, 1)',
      yellow: 'hsla(52, 100%, 71%, 1)',
    },
  },
});
