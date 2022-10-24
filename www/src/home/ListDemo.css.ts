import { style } from '@vanilla-extract/css';
import { vars } from '../styles/Theme.css';

export const list = style({
  marginTop: 30,
});

export const row = style({
  borderTop: '1px solid #E1E7ED',
  height: 40,
  display: 'flex',
  alignItems: 'center',
});

export const name = style({
  color: vars.color.textContrastHigh,
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '95%',
  width: 240,
  display: 'flex',
  gap: 12,
  paddingLeft: 8,
});

export const role = style({
  color: vars.color.textContrastHigh,
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '95%',
  paddingLeft: 12,
});

export const checkbox = style({});
