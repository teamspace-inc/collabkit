import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from './Theme.css';

export const website = style({});

export const bg = style({
  backgroundColor: vars.color.bgContrastLowest,
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
      gap: '0px',
      padding: '80px 20px',
    },
  },
});

export const h3OnPurple = style({
  color: '#ADA0C0 !important',
});

export const purpleBg = style({
  background: '#2E2739',
  color: 'white',
});

export const vertical20 = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const vertical40 = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
});

globalStyle(`${website} small`, {
  fontFamily: 'Satoshi',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '16px',
  opacity: 0.5,
  whiteSpace: 'nowrap',
});

globalStyle(`${website} h1`, {
  fontFamily: 'Clash Display',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  color: vars.color.textContrastHigh,
  margin: '0px',
  zIndex: 1,
  maxWidth: 'unset',
  minWidth: 'unset',
  fontSize: '64px',
  lineHeight: '90%',

  '@media': {
    'screen and (max-width: 720px)': {
      lineHeight: '32px',
      fontSize: '29px',
    },
  },
});

globalStyle(`${website} h2`, {
  fontFamily: 'Clash Display',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '44px',
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
  fontFamily: 'Satoshi',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '28px',
  lineHeight: '38px',
  fontFeatureSettings: 'ss04 on',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
});

globalStyle(`${website} h4`, {
  fontFamily: 'Clash Display',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '26px',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      fontFamily: 'Clash Display',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '26px',
    },
  },
});

globalStyle(`${website} h5`, {
  fontFamily: 'Satoshi',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '19px',
  color: vars.color.textContrastHigh,
  margin: '0px',

  '@media': {
    'screen and (max-width: 720px)': {
      fontFamily: 'Satoshi',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '19px',
    },
  },
});

globalStyle('body', {
  fontFamily: 'Satoshi',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '18px',
  color: vars.color.textContrastHigh,
});

globalStyle(`${website} p`, {
  fontFamily: 'Satoshi',
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

export const header = style({
  position: 'fixed',
  top: 20,
  left: 0,
  right: 0,
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
});

export const headerInner = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  maxWidth: '1124px',
});

export const a = style({
  color: vars.color.textContrastHigh,
});

export const tabs = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifySelf: 'center',
  gap: '8px',
});

export const tab = recipe({
  base: {
    fontFamily: 'Satoshi',
    fontStyle: 'normal',
    width: '120px',
    fontSize: 16,
    lineHeight: '18px',
    padding: '16px',
    color: vars.color.textContrastHigh,
    borderRadius: '32px',
    height: '50px',
    fontWeight: '500',
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
    fontFamily: 'Satoshi',
    fontStyle: 'normal',
    fontWeight: 700,
    boxSizing: 'border-box',
    color: vars.color.textContrastHigh,
    background: vars.color.bgContrastMedium,
    borderRadius: 100,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    cursor: 'pointer',
    border: '0px solid transparent',
  },
  variants: {
    type: {
      primary: {
        color: vars.color.bgContrastLowest,
        borderColor: vars.color.bgContrastLowest,
        background: vars.color.textContrastHigh,
      },
      secondary: {
        color: vars.color.textContrastHigh,
        background: 'transparent',
        borderColor: vars.color.textContrastHigh,
        borderWidth: '1px',
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

        fontFamily: 'Satoshi',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '17px',
      },
      medium: {
        height: '40px',
        padding: '0px 20px',

        fontFamily: 'Satoshi',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
      },
      large: {
        height: '50px',
        padding: '0px 28px',

        fontFamily: 'Satoshi',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '110%',
        textAlign: 'center',
      },
    },
  },
});
