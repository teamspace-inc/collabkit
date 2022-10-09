// import type { CustomTheme } from '@collabkit/theme';

// export const table: CustomTheme = {
//   radii: { 0: '4px', composer: '8px' },
//   fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '32px', button: '12px' },
//   lineHeights: { 0: '18.36px', 1: '22.4px' },
//   fontWeights: {
//     2: 500,
//     3: 700,
//     button: 600,
//     mention: 600,
//     mentionDropdownItemMark: 600,
//     profileNameText: 600,
//   },
//   sizes: {
//     avatar: '32px',
//   },
//   padding: {
//     commentTop: 0,
//     commentBottom: 0,
//     commentLeft: 0,
//     commentRight: 0,
//   },
//   borders: {
//     composer: '1px solid #36B374',

//     buttonPrimary: '',
//     buttonSecondary: '',
//     buttonTertiary: '',

//     buttonPrimaryActive: '',
//     buttonSecondaryActive: '',
//     buttonTertiaryActive: '',

//     buttonPrimaryHover: '',
//     buttonSecondaryHover: '',
//     buttonTertiaryHover: '',
//   },
//   space: {
//     commentHeaderBodyGap: '12px',
//   },
//   shadows: {
//     mentionDropdownBoxShadow:
//       '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
//   },
//   colors: {
//     sendButtonColor: '#36B374',
//     sendButtonDisabledColor: '#E3E9ED',
//     sendButtonTextColor: 'white',
//     sendButtonDisabledTextColor: '#B4BDC2',
//     buttonPrimaryBackground: '#36B374',

//     mentionText: '#007FF5',
//     mentionDropdownMarkBackground: 'none',
//     mentionDropdownTextColor: 'black',

//     buttonPrimaryText: 'white',
//     buttonPrimaryHoverBackground:
//       'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #36B374',
//     buttonPrimaryHoverText: 'white',

//     buttonPrimaryActiveBackground:
//       'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #36B374',
//     buttonPrimaryActiveText: 'white',

//     buttonSecondaryBackground: 'transparent',
//     buttonSecondaryText: '#6A7278',

//     buttonTertiaryBackground: 'white',
//     buttonTertiaryText: '#6A7278',

//     buttonTertiaryHoverBackground: 'rgba(0, 0, 0, 0.05)',
//     buttonTertiaryActiveBackground: 'rgba(0, 0, 0, 0.1)',

//     buttonDisabledText: '#B4BDC2',
//     buttonDisabledBackground: '#E3E9ED',

//     backgroundColor: 'white',
//     composerBackground: 'white',
//     composerPlaceholder: '#6A7278',
//     primaryText: 'black',
//     secondaryText: '#6A7278',
//     caretColor: 'black',
//     indicatorLineColor: 'rgba(0,0,0,0.1)',
//   },
//   offsets: {},
// };

export default {
  avatar: {
    size: '32px',
    fontSize: '14px',
  },
  fontWeights: {
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
    content: {
      gap: '12px',
    },
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
