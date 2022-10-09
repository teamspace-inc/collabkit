import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from './Theme.css';

export const editorAndPreview = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100vw',
  height: '100%',
});

export const codeEditor = style({
  position: 'relative',
  display: 'grid',
  background: vars.color.bgContrastLow,
  gridTemplateColumns: '1fr',
  boxSizing: 'border-box',
});

export const root = style({
  display: 'grid',
  gridTemplateRows: '100px calc(100vh - 100px)',
  position: 'fixed',
  height: '100%',
  inset: 0,
});

export const header = style({
  padding: '40px 28px',
  display: 'grid',
  gridTemplateColumns: '300px 1fr 300px',
  width: '100vw',
});

export const componentList = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  gap: '20px',
  color: vars.color.textContrastMedium,
  fontSize: '16px',
});

export const componentListItem = recipe({
  base: {
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        cursor: 'default',
        fontWeight: '700',
        color: vars.color.textContrastHigh,
      },
    },
  },
});
