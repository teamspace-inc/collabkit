const bgContrastHigh = '#DDDDDD';
const bgContrastLow = '#F6F6F6';
const bgContrastLowest = '#FFFFFF';
const bgContrastMedium = '#EEEEEE';
const blue = '#3494FA';
const highlight = 'rgba(0, 0, 0, 0.04)';
const red = '#E55D59';
const textContrastHigh = '#222222';
const textContrastLow = '#A0A0A0';
const textContrastMedium = '#888888';

export const ColorBase = {
  color: {
    background: bgContrastLowest,
    backgroundMedium: bgContrastMedium,
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
    pin: textContrastHigh,
    pinActive: blue,
  },
};
