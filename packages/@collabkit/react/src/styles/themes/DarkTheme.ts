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
    border: colors.opacity7,
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
});
