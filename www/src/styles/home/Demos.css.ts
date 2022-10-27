import { style } from '@vanilla-extract/css';

export const h3 = style({
  color: '#ADA0C0 !important',
});

export const h4 = style({
  fontFamily: 'Satoshi !important',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px !important',
  lineHeight: '30px !important',
  flex: 1,
});

export const demoOuterWrapper = style({
  display: 'grid',
  gridTemplateRows: '50px 1fr',
  gap: '40px',
  marginTop: '60px',
});

export const demoWrapper = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(100%, 1124px)',
  flex: 1,
  marginLeft: 16,
  marginRight: 16,
});
