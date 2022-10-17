import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../styles/Theme.css';

export const ui = style({
  flex: 1,
  background: '#F0F4F8',
  borderRadius: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  padding: 30,
  textAlign: 'initial',
  position: 'relative',

  overflow: 'hidden',
  /* this fixes the overflow:hidden in Chrome */
  WebkitMaskImage:
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)',
});

export const container = style({
  background: '#FFFFFF',
  border: '1px solid #EAEFF4',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 30,
});

export const headingRow = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const heading = style({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '95%',
  color: vars.color.textContrastHigh,
});

export const grid = style({
  height: 430,
});

export const nestedRow = style({
  background: '#FAFAFB',
});

globalStyle(`${nestedRow} .ag-cell:first-of-type`, {
  paddingLeft: 30,
});
