import { style } from '@vanilla-extract/css';

export const footerLinkButton = style({
  border: '1px solid white',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '100%',
  boxSizing: 'border-box',
  height: '60px',
  padding: '0 2rem',
  width: '16rem',
  textAlign: 'center',
  borderRadius: '100px',
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
});

const footerLink = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '120%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
  color: '#999999',
  textDecoration: 'none',
});
