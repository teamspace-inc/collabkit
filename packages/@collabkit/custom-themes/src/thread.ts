import type { CustomTheme } from '@collabkit/theme';

export const thread: CustomTheme = {
  radii: { 0: '0.5rem' },
  fontSize: { 0: '12px', 2: '14px', 3: '20px' },
  fontWeights: { 2: 500, 3: 700 },
  colors: {
    sendButtonColor: 'rgb(94, 81, 248)',
    backgroundColor: 'rgb(249,249,250)',
    composerBackground: 'white',
    mentionDropdownItemSelectedBackgroundColor: 'rgb(94, 81, 248)',
    mentionDropdownItemSelectedTextColor: 'white',
  },
  offsets: {
    composerSendButtonTop: '13px',
  },
};
