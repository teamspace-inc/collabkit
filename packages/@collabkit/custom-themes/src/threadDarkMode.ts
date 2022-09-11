import type { CustomTheme } from '@collabkit/theme';

export const threadDarkMode: CustomTheme = {
  radii: { 0: '4px' },
  fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '20px' },
  lineHeights: { 0: '20px', 1: '20px' },
  fontWeights: { 2: 500, 3: 700 },
  borders: {
    composer: '1px solid #404045',
  },
  colors: {
    sendButtonColor: '#414286',
    backgroundColor: '#1e1e21',
    composerBackground: '#1e1e21',
    composerPlaceholder: '#515159',
    primaryText: 'rgb(212,212,216)',
    caretColor: 'rgb(212,212,216)',
    commentHoverBackgroundColor: 'rgba(0,0,0,0.1)',
    commentUnseenBackgroundColor: '#3F3F45',
    commentUnseenHoverBackgroundColor: 'rgba(255,255,255,0.1)',
    indicatorLineColor: 'rgba(0,0,0,0.1)',
    mentionDropdownBackgroundColor: '#1e1e21',
    mentionDropdownItemSelectedBackgroundColor: '#414286',
    mentionDropdownTextColor: 'rgb(212,212,216)',
    mentionDropdownItemSelectedTextColor: 'rgb(212,212,216)',
    mentionDropdownItemHoverTextColor: 'rgb(212,212,216)',
  },
  offsets: {
    composerSendButtonTop: '14px',
  },
};
