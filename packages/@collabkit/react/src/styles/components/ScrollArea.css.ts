import { style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const root = style({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const viewport = style({
  width: '100%',
  height: '100%',
  borderRadius: vars.scrollbar.borderRadius,
});

export const scrollbar = style({
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  borderRadius: vars.scrollbar.borderRadius,
  padding: vars.scrollbar.padding,
  background: vars.scrollbar.background,
  transition: 'background 160ms ease-out',
  selectors: {
    '&:hover': { background: vars.scrollbar.hover.background },
    '&[data-orientation="vertical"]': { width: vars.scrollbar.thumb.width },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: vars.scrollbar.thumb.width,
    },
  },
});

export const thumb = style({
  flex: 1,
  background: vars.scrollbar.thumb.background,
  borderRadius: vars.scrollbar.thumb.borderRadius,
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
