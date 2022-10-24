import { globalStyle, style } from '@vanilla-extract/css';

export const grid = style({
  height: 430,
});

export const nestedRow = style({
  background: '#FAFAFB',
});

globalStyle(`${nestedRow} .ag-cell:first-of-type`, {
  paddingLeft: 30,
});
