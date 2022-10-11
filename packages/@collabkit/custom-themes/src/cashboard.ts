import { CustomTheme } from '@collabkit/react';

export const cashboard: CustomTheme = {
  text: {
    base: {
      fontSize: '14px',
      lineHeight: '22px',
    },
    small: {
      fontSize: '14px',
      lineHeight: '22px',
    },
    large: {
      fontSize: '14px',
      lineHeight: '22px',
    },
    tiny: {
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
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
    disabled: {
      color: '#B4BDC2',
      background: '#E3E9ED',
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
      profile: {
        gap: '12px',
      },
      nameAndTimestamp: {
        gap: '0px',
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
      background: 'white',
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
