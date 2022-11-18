// import type { CustomTheme } from '@collabkit/theme';

// export const threadDarkMode: CustomTheme = {
//   radii: { 0: '4px' },
//   fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '20px' },
//   lineHeights: { 0: '20px', 1: '20px' },
//   fontWeights: { 2: 500, 3: 700 },
//   borders: {
//     composer: '1px solid #404045',
//   },
//   colors: {
//     sendButtonColor: '#414286',
//     backgroundColor: '#1e1e21',
//     composerBackground: '#1e1e21',
//     composerPlaceholder: '#515159',
//     primaryText: 'rgb(212,212,216)',
//     caretColor: 'rgb(212,212,216)',
//     commentHoverBackgroundColor: 'rgba(0,0,0,0.1)',
//     commentUnseenBackgroundColor: '#3F3F45',
//     commentUnseenHoverBackgroundColor: 'rgba(255,255,255,0.1)',
//     indicatorLineColor: 'rgba(0,0,0,0.1)',
//     mentionDropdownBackgroundColor: '#1e1e21',
//     mentionDropdownItemSelectedBackgroundColor: '#414286',
//     mentionDropdownTextColor: 'rgb(212,212,216)',
//     mentionDropdownItemSelectedTextColor: 'rgb(212,212,216)',
//     mentionDropdownItemHoverTextColor: 'rgb(212,212,216)',
//   },
//   offsets: {
//     composerSendButtonTop: '14px',
//   },
// };

export default {
  avatar: {
    size: '32px',
    fontSize: '14px',
  },
  fontWeight: {
    bold: '600',
  },
  shadow: {
    standard: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    high: `0px -12px 24px rgba(0, 0, 0, 0.02), 
           0px 12px 24px rgba(0, 0, 0, 0.06)`,
  },
  iconButton: {
    color: '#6A7278',
    size: '32px',
    hover: {
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), #FFFFFF`,
    },
  },
  color: {
    textPrimary: '#000000',
  },
  button: {
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: '600',
    primary: {
      background: '#36B374',
      color: 'white',
      hover: {
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #36B374',
      },
      active: {
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #36B374',
      },
    },
  },
  profile: {
    name: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: '600',
    },
  },
  comment: {
    header: {
      gap: '12px',
      alignItems: 'center',
      justifyContent: 'center',
      profile: {
        alignItems: 'center',
        gap: '12px',
      },
      nameAndTimestamp: {
        gap: 0,
      },
    },
    gap: '12px',
    timestamp: {
      fontSize: '12px',
      lineHeight: '18px',
      color: '#6A7278',
    },
    body: {
      fontSize: '14px',
      lineHeight: '22px',
    },
  },
  popoverThread: {
    border: '1px solid #E3E9ED',
  },
  composer: {
    border: '1px solid #E3E9ED',
    background: 'white',
    hover: {
      background: 'white',
      border: '1px solid #E3E9ED',
    },
    active: {
      border: '1px solid #36B374',
    },
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '22.4px',
  },
  mentions: {
    pill: {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      color: '#007FF5',
    },
    typeahead: {
      background: 'white',
      item: {
        fontWeight: '400',
        hover: {
          background: `rgba(0, 0, 0, 0.05)`,
        },
        email: {
          color: '#000000',
        },
        name: {
          fontWeight: '400',
        },
        mark: {
          fontWeight: '600',
        },
      },
    },
  },
};
