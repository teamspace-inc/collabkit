import { createGlobalThemeContract, createTheme, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const website = style({});

export const vars = createGlobalThemeContract({
  color: {
    bgContrastLowest: 'bg-contrast-lowest',
    bgContrastLow: 'bg-contrast-low',
    bgContrastMedium: 'bg-contrast-medium',
    bgContrastHigh: 'bg-contrast-high',
    textContrastLow: 'text-contrast-low',
    textContrastMedium: 'text-contrast-medium',
    textContrastHigh: 'text-contrast-high',
    highlight: 'highlight',
    disabledOverlay: 'disabled-overlay',
    tomato: 'tomato',
    red: 'red',
    crimson: 'crimson',
    pink: 'pink',
    plum: 'plum',
    purple: 'purple',
    violet: 'violet',
    indigo: 'indigo',
    blue: 'blue',
    cyan: 'cyan',
    teal: 'teal',
    green: 'green',
    grass: 'grass',
    brown: 'brown',
    orange: 'orange',
    sky: 'sky',
    mint: 'mint',
    lime: 'lime',
    yellow: 'yellow',
    amber: 'amber',
  },
});

export const bg = style({
  backgroundColor: vars.color.bgContrastLowest,
});

export const dark = createTheme(vars, {
  color: {
    bgContrastLowest: '#222',
    bgContrastLow: '#2C2C2C',
    bgContrastMedium: '#3D3D3D',
    bgContrastHigh: '#4D4D4D',
    textContrastLow: '#999999',
    textContrastMedium: '#BBBBBB',
    textContrastHigh: '#FFFFFF',
    highlight: 'rgba(255, 255, 255, 0.06)',
    disabledOverlay: 'rgba(0, 0, 0, 0.7)',
    tomato: '#E06C51',
    red: '#E56865',
    crimson: '#E26389',
    pink: '#D560A5',
    plum: '#B064BD',
    purple: '#9669C9',
    violet: '#7A70D3',
    indigo: '#5779DF',
    blue: '#4DA0F9',
    cyan: '#43ACC6',
    teal: '#4AAB9F',
    green: '#5BA97D',
    grass: '#6CAC71',
    brown: '#B58C69',
    orange: '#F58947',
    sky: '#9FE7FD',
    mint: '#ACEFDB',
    lime: '#CCEB65',
    yellow: '#FFEE78',
    amber: '#FBCC64',
  },
});

export const light = createTheme(vars, {
  color: {
    bgContrastLowest: '#FFFFFF',
    bgContrastLow: '#F6F6F6',
    bgContrastMedium: '#EEEEEE',
    bgContrastHigh: '#DDDDDD',
    textContrastLow: '#A0A0A0',
    textContrastMedium: '#888888',
    textContrastHigh: '#222222',
    highlight: 'rgba(0, 0, 0, 0.04)',
    disabledOverlay: 'rgba(255, 255, 255, 0.7)',
    tomato: '#E06C51',
    red: '#E56865',
    crimson: '#E26389',
    pink: '#D560A5',
    plum: '#B064BD',
    purple: '#9669C9',
    violet: '#7A70D3',
    indigo: '#5779DF',
    blue: '#4DA0F9',
    cyan: '#43ACC6',
    teal: '#4AAB9F',
    green: '#5BA97D',
    grass: '#6CAC71',
    brown: '#B58C69',
    orange: '#F58947',
    sky: '#9FE7FD',
    mint: '#ACEFDB',
    lime: '#CCEB65',
    yellow: '#FFEE78',
    amber: '#FBCC64',
  },
});

globalStyle(`${website} section`, {
  position: 'relative',
  display: 'flex',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  padding: '140px 0px 160px',
  gap: '40px',
  '@media': {
    'screen and (max-width: 720px)': {
      gap: '30px',
    },
  },
});

globalStyle(`${website} small`, {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '16px',
  opacity: 0.5,
  whiteSpace: 'nowrap',
  letterSpacing: '0',
});

globalStyle(`${website} h1`, {
  fontFamily: 'Space Grotesk',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  letterSpacing: '-0.05em',
  color: vars.color.textContrastHigh,
  margin: '0px',
  zIndex: 1,
  maxWidth: 'unset',
  minWidth: 'unset',
  fontSize: '112px',
  lineHeight: '100px',

  '@media': {
    'screen and (max-width: 720px)': {
      lineHeight: '43px',
      fontSize: '48px',
    },
  },
});

globalStyle(`${website} h2`, {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '44px',
  letterSpacing: '-0.03em',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      lineHeight: '42px',
      fontSize: '36px',
    },
  },
});

globalStyle(`${website} h3`, {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '44px',
  letterSpacing: '-0.02em',
  fontFeatureSettings: 'ss04 on',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      fontSize: '20px',
      lineHeight: '22px',
    },
  },
});

globalStyle(`${website} h4`, {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '26px',
  letterSpacing: '-0.05em',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      fontFamily: 'Space Grotesk',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '26px',
      letterSpacing: '-0.05em',
    },
  },
});

globalStyle(`${website} h5`, {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '19px',
  letterSpacing: '-0.03em',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '19px',
      letterSpacing: '-0.03em',
    },
  },
});

globalStyle('body', {
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '18px',
  color: vars.color.textContrastHigh,
});

globalStyle(`${website} p`, {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '18px',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {},
  },
});

globalStyle(`${website} code`, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '18px',
  fontFamily: 'Monaco, monospace',
  color: vars.color.textContrastHigh,
});

export const a = style({
  color: vars.color.textContrastHigh,
});

export const tabs = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

export const tab = recipe({
  base: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: '20px',
    padding: '20px 32px',
    color: vars.color.textContrastHigh,
    borderRadius: '12px',
    height: '60px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    ':hover': {
      background: vars.color.highlight,
    },
  },
  variants: {
    active: {
      true: {
        fontWeight: '700 !important',
        background: vars.color.highlight,
      },
    },
  },
});

export const button = recipe({
  base: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    boxSizing: 'border-box',
    letterSpacing: '-0.03em',
    color: vars.color.textContrastHigh,
    background: vars.color.bgContrastMedium,
    borderRadius: 100,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    cursor: 'pointer',
    ':hover': {
      background: vars.color.highlight,
    },
    border: '2px solid transparent',
  },
  variants: {
    type: {
      primary: {
        color: vars.color.textContrastHigh,
        borderColor: vars.color.bgContrastLowest,
        background: vars.color.bgContrastLow,
      },
      secondary: {
        color: vars.color.textContrastHigh,
        background: 'transparent',
        borderColor: vars.color.bgContrastLow,
      },
      tertiary: {
        color: vars.color.textContrastHigh,
        background: 'transparent',
        borderColor: 'transparent',
      },
    },
    size: {
      small: {
        padding: '0px 16px',
        height: '36px',

        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
      },
      medium: {
        height: '40px',
        padding: '0px 20px',

        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        letterSpacing: '-0.03em',
      },
      large: {
        height: '60px',
        padding: '0px 28px',

        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '110%',
        textAlign: 'center',
        letterSpacing: '-0.03em',
      },
    },
  },
});

globalStyle('h4', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  fontFeatureSettings: 'ss04 on',
  margin: 0,
  fontSize: '24px',
  lineHeight: '32px',

  '@media': {
    'screen and (max-width: 720px)': {
      textAlign: 'left',
      marginTop: 0,
      maxWidth: '90vw',
      minWidth: '90vw',
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
});
