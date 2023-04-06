import merge from 'deepmerge';
import { BaseTheme } from './BaseTheme';

const bgContrastHigh = '#4D4D4D';
const bgContrastLow = '#2C2C2C';
const bgContrastLowest = '#222222';
const blue = '#4DA0F9';
const highlight = 'rgba(255, 255, 255, 0.06)';
const red = '#E56865';
const textContrastHigh = '#FFFFFF';
const textContrastLow = '#999999';
const textContrastMedium = '#BBBBBB';

export const DarkTheme = merge(BaseTheme, {
  color: {
    background: bgContrastLowest,
    backgroundMedium: bgContrastLow,
    surface: bgContrastLow,
    surfaceOverlay: highlight,
    textPrimary: textContrastHigh,
    textSecondary: textContrastMedium,
    textDisabled: textContrastLow,
    border: bgContrastHigh,
    attention: red,
    attentionBlue: blue,
    icon: textContrastHigh,
    iconSecondary: textContrastMedium,
    iconDisabled: textContrastLow,
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
