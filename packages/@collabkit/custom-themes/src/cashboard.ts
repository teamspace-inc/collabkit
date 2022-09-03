import type { CustomTheme } from '@collabkit/theme';

export const cashboard: CustomTheme = {
  radii: { 0: '4px' },
  fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '32px', button: '12px' },
  lineHeights: { 0: '18.36px', 1: '22.4px' },
  fontWeights: { 2: 500, 3: 700, button: 600 },
  sizes: {
    avatar: '32px',
  },
  borders: {
    composer: '1px solid #36B374',
  },
  shadows: {
    mentionDropdownBoxShadow:
      '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
  },
  colors: {
    sendButtonColor: '#36B374',
    sendButtonDisabledColor: '#E3E9ED',
    sendButtonTextColor: 'white',
    sendButtonDisabledTextColor: '#B4BDC2',
    buttonPrimaryBackground: '#36B374',
    buttonPrimaryText: 'white',
    buttonPrimaryHoverBackground: '#36B374',
    buttonPrimaryHoverText: 'white',

    buttonSecondaryBackground: 'white',
    buttonSecondaryText: '#6A7278',

    buttonDisabledText: '#B4BDC2',

    backgroundColor: 'white',
    composerBackground: 'white',
    composerPlaceholder: '#6A7278',
    primaryText: 'black',
    secondaryText: '#6A7278',
    caretColor: 'black',
    indicatorLineColor: 'rgba(0,0,0,0.1)',
  },
  offsets: {},
};
