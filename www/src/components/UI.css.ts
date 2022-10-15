import { style } from '@vanilla-extract/css';

export const ui = style({
  margin: '0 auto',
  maxWidth: 1124,
  background: '#F0F4F8',
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  padding: 30,
});

export const container = style({
  background: '#FFFFFF',
  border: '1px solid #EAEFF4',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  padding: 30,
});

export const headingRow = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const heading = style({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '95%',
});
