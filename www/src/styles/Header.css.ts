import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './Theme.css';

export const root = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
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
  height: 80,
  padding: '14px 16px 15px',
});

export const rightLinks = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '80px',
  alignItems: 'center',
});

globalStyle(`${rightLinks} a`, {
  color: vars.color.textContrastHigh,
});
