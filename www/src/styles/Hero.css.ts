import { style } from '@vanilla-extract/css';
import { vars } from './Theme.css';

export const section = style({
  position: 'relative',
  overflow: 'hidden',
  background: '#FFEC6B',
  minHeight: '982px',
  textAlign: 'center',
});

export const h3 = style({
  fontFamily: 'Clash Display',
});

export const uiWrap = style({
  height: 'calc(434px / 632px)',
  display: 'flex',
  overflow: 'hidden',
  maxWidth: '1124px',
  marginBottom: '-360px',
  marginTop: '100px',
});

export const messageList = style({
  display: 'flex',
  gap: '16px',
  flexDirection: 'column',
});

export const h1 = style({
  fontWeight: 600,
  fontSize: 144,
  lineHeight: '90%',
  marginLeft: '-40px',
});

export const center = style({
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '1fr',
});

export const heroImage = style({
  marginTop: '30px',
  width: 'calc(100vw - 40px)',
  maxWidth: '1124px',
});

export const chevronWrap = style({
  height: 60,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const chevron = style({
  display: 'block',
  marginTop: '0px',
  width: '24px',
  marginLeft: -12,
  padding: '60px 0',
});

export const avatar = style({
  width: 28,
  height: 28,
  background: 'red',
  borderRadius: '50%',
});

export const message = style({
  background: 'white',
  color: 'black',
  padding: '20px',
  textAlign: 'left',
  display: 'grid',
  borderRadius: '16px',
  gridTemplateColumns: '28px 1fr',
  gap: '8px',
  width: '308px',
  boxSizing: 'border-box',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
});

export const body = style({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  marginTop: '8px',
});

export const name = style({
  fontFamily: 'Satoshi',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '14px',
});

export const timeAgo = style({
  color: vars.color.textContrastLow,
  marginLeft: '12px',
  fontWeight: 400,
  fontSize: 13,
  lineHeight: '16px',
});
