import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  display: 'flex',
  gap: '20px',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: 10,
      alignSelf: 'center'
    },
  },
});