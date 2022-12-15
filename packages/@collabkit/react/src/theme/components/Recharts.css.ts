import { style } from '@vanilla-extract/css';

export const contextMenu = style({
  outline: 0,
  background: 'white',
  border: '1px solid #ddd',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: 4,
  borderRadius: 8,
});

export const contextMenuItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  background: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  textAlign: 'left',
  lineHeight: 1.5,
  margin: '0',
  outline: '0',
  selectors: {
    '&:focus, &:not([disabled]):active': {
      background: 'royalblue',
      color: 'white',
    },
  },
});
