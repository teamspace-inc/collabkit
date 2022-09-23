import { style } from '@vanilla-extract/css';

const SCROLLBAR_SIZE = 6;

export const root = style({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const viewport = style({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const scrollbar = style({
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  transition: 'background 160ms ease-out',
  selectors: {
    '&:hover': { background: 'hsl(0 0% 13.6%)' },
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: SCROLLBAR_SIZE,
    },
  },
});

export const thumb = style({
  flex: 1,
  background: 'hsl(0 0% 50%)',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: 44,
      minHeight: 44,
    },
  },
});

export const corner = style({
  background: 'hsl(0, 0%, 30%)',
});
