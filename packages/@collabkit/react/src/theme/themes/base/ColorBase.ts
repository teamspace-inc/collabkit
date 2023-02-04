const colors = {
  black10: 'hsl(0, 0%, 10%)', // Black 10
  black13: 'hsl(0, 0%, 13%)', // Black 13
  grey24: 'hsl(0, 0%, 24%)', // Grey 24
  grey30: 'hsl(0, 0%, 30%)', // Grey 30
  grey53: 'hsl(0, 0%, 53%)', // Grey 53
  grey60: 'hsl(0, 0%, 60%)', // Grey 60
  grey73: 'hsl(0, 0%, 73%)', // Grey 73
  grey89: 'hsl(0, 0%, 89%, 1)',
  grey93: 'hsl(0, 0%, 93%, 1)',
  grey96: 'hsl(0, 0%, 96%, 1)',
  grey7: 'hsl(0, 0%, 7%)', // Grey 7
  white: 'hsl(0, 0%, 100%)', // White
  opacity7: 'rgba(0, 0, 0, 0.08)', // White Opacity 7
  opacity4: 'rgba(0, 0, 0, 0.04)', // White Opacity 7
  red: 'hsl(2, 73%, 62%)', // Red
  blue: 'hsl(211, 95%, 59%)', // Blue
};

export const ColorBase = {
  color: {
    background: colors.white,
    surface: '#f6f6f6',
    surfaceHover: colors.grey96,
    surfaceOverlay: colors.opacity7,
    textPrimary: colors.black10,
    textSecondary: colors.grey30,
    textDisabled: colors.grey60,
    textLink: colors.black10,
    border: colors.grey89,
    icon: colors.grey24,
    iconSecondary: colors.grey53,
    attention: colors.red,
    attentionBlue: colors.blue,
  },
};
