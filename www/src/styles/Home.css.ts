import { globalStyle, style } from '@vanilla-extract/css';

export const card = style({
  background: '#fff',
  padding: '40px',
  borderRadius: '24px',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-start',

  '@media': {
    'screen and (max-width: 768px)': {
      minHeight: 540,
      width: 'calc(100vw - 40px)',
    },
  },
});

globalStyle(`${card} h2`, {
  fontSize: 48,
  lineHeight: '59px',
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
