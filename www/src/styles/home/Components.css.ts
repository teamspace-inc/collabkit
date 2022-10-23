import { style } from '@vanilla-extract/css';

export const component = style({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  boxSizing: 'border-box',
});

export const card = style({
  fontFamily: 'Inter, sans-serif !important',
  background: '#4A3A63',
  width: 480,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '24px',
});

export const componentTitle = style({
  fontFamily: 'Satoshi, sans-serif !important',
  marginBottom: '4px !important',
  lineHeight: '28px !important',
});

export const componentDescription = style({
  lineHeight: '28px !important',
  color: 'hsla(264, 20%, 69%, 1) !important',
});
