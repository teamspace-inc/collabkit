import { style } from '@vanilla-extract/css';

export const component = style({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  boxSizing: 'border-box',
});

export const card = style({
  fontFamily: 'Inter, sans-serif !important',
  background: '#4A3A63',
  width: 480,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '24px',
  overflow: 'hidden',

  '@media': {
    'screen and (max-width: 720px)': {
      flexGrow: 1,
      width: 'calc(100vw - 40px)',
      height: 400,
      background: '#4A3A63',
      borderRadius: '24px',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export const componentTitle = style({
  fontFamily: 'Satoshi, sans-serif !important',
  marginBottom: '4px !important',
  lineHeight: '28px !important',
});

export const componentDescription = style({
  lineHeight: '28px !important',
  color: 'hsla(264, 20%, 69%, 1) !important',

  '@media': {
    'screen and (max-width: 720px)': {
      fontSize: '16px !important',
    },
  },
});
