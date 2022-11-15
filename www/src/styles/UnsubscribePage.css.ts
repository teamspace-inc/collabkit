import { style } from '@vanilla-extract/css';

export const page = style({
  padding: 20,
  margin: '0 auto',
});

export const container = style({
  padding: 40,
  margin: '60px auto',
  maxWidth: 350,
  background: 'white',
  borderRadius: 8,
});

export const logo = style({
  width: 220,
  height: 80,
  marginBottom: 40,
});

export const title = style({
  fontWeight: '600',
  fontSize: 24,
  lineHeight: '128%',
  letterSpacing: '-0.33px',
  color: '#222222',
  marginBottom: 40,
});

export const message = style({
  color: '#999999',
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: 40,
});

export const button = style({
  background: '#222222 !important',
  padding: 16,
  fontWeight: '700',
  fontSize: 16,
  lineHeight: '110%',
  textAlign: 'center',
  color: 'white',
  borderRadius: 8,

  selectors: {
    '&:focus, &:not([disabled]):active': {
      background: '#494949 !important',
    },
  },
});
