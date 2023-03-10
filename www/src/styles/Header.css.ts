import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './Theme.css';

export const HEADER_HEIGHT = 80;

export const root = style({
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  background: vars.header.backgroundColor,
  borderBottom: '1px solid red',
  borderBottomColor: vars.header.borderColor,
});

export const content = style({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  maxWidth: '1124px',
  height: HEADER_HEIGHT,
  padding: '14px 16px 15px',
  zIndex: 2,

  '@media': {
    'screen and (max-width: 768px)': {
      height: 60,
    },
  },
});

export const rightLinks = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '80px',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 960px)': {
      gap: 40,
    },
  },
});

globalStyle(`${rightLinks} a`, {
  color: vars.color.textContrastHigh,
});

export const smallLogoImg = style({
  height: '16px',
});

export const smallMenu = style({
  position: 'fixed',
  inset: 0,
  background: vars.color.yellow,
});

export const smallLink = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '36px',
  textAlign: 'center',
  color: vars.color.textContrastHigh,
  cursor: 'pointer',
});

export const smallLinkList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
});
