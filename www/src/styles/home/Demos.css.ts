import { style } from '@vanilla-extract/css';

export const h3 = style({
  color: '#ADA0C0 !important',
});

export const section = style({
  background: '#35284A',
  color: 'white',
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

export const demoMaxWidth = style({});
