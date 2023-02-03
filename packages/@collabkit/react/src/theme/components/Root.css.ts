import { globalStyle, style } from '@vanilla-extract/css';

// root wrapper for all collabkit global styles
export const collabkit = style({});

globalStyle(`${collabkit} *`, {
  boxSizing: 'border-box',
});
