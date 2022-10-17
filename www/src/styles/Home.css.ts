import { style } from '@vanilla-extract/css';

export const card = style({
  background: '#fff',
  padding: '40px',
  borderRadius: '24px',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const ul = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  flex: 1,
});

export const li = style({
  display: 'flex',
  gap: '20px',
  padding: '12px 20px 12px 0px',
  alignItems: 'flexStart',
  textAlign: 'left',
});
