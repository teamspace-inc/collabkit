import { style } from '@vanilla-extract/css';

export const h2 = style({
  fontSize: 24,
  lineHeight: '34px',
  margin: 0,
  fontWeight: 400,
  color: '#BBBBBB',
});

export const h3 = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 24,
  margin: '0 0 20px',
  lineHeight: '28px',
  color: 'white',
});

export const a = style({
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: 'Satoshi',
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'black',
  ':hover': {
    textDecoration: 'underline',
  },
});
