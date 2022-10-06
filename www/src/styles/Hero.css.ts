import { style } from '@vanilla-extract/css';

export const section = style({ position: 'relative', overflow: 'hidden', background: '#FFEC6B' });

export const center = style({
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  gridTemplateColumns: '1fr',
});

export const heroImage = style({
  marginTop: '30px',
  width: 'calc(100vw - 40px)',
  maxWidth: '1124px',
});

export const chevronWrap = style({
  height: 60,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const chevron = style({
  display: 'block',
  marginTop: '0px',
  width: '24px',
  marginLeft: -12,
  padding: '60px 0',
});
