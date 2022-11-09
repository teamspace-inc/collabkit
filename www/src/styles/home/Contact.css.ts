import { style } from '@vanilla-extract/css';

export const backedByYCText = style({
  color: 'white !important',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '120%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
});

export const footerLinkButton = style({
  border: '1px solid white',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '100%',
  boxSizing: 'border-box',
  height: '50px',
  padding: '12px 24px',
  width: '16rem',
  textAlign: 'center',
  borderRadius: '100px',
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',

  '@media': {
    'screen and (max-width: 768px)': {
      width: 'calc(100vw - 40px)',
      selectors: {
        '&:first-of-type': {
          marginTop: '20px',
        },
        '&:last-of-type': {
          marginBottom: '-20px',
        },
      },
    },
  },
});

export const footerLink = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1rem',
  lineHeight: '120%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
  color: '#999999',
  textDecoration: 'none',

  '@media': {
    'screen and (max-width: 768px)': {
      padding: '5px 4px',
      display: 'inline-block',
    },
  },
});
