import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
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

export const demoTip = recipe({
  base: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '90%',
    letterSpacing: '-0.03em',
    display: 'flex',
    alignItems: 'center',
    padding: '21px 14px',
    position: 'relative',
    borderRadius: 12,
  },
  variants: {
    color: {
      light: {
        background: 'white',
        color: '#222222',
      },
      dark: {
        background: '#222222',
        color: 'white',
      },
    },
  },
});

export const demoTipArrow = recipe({
  base: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, 50%) rotate(45deg)',
  },
  variants: {
    color: {
      light: {
        background: 'white',
      },
      dark: {
        background: '#222222',
      },
    },
  },
});
