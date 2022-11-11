import { style, fallbackVar } from '@vanilla-extract/css';
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
  borderRadius: fallbackVar(vars.scrollbar.borderRadius, '6px'),
  padding: fallbackVar(vars.scrollbar.padding, '1px'),
  background: fallbackVar(vars.scrollbar.background, 'transparent'),
  transition: 'background 160ms ease-out',
  fontFamily: vars.fontFamily,
  selectors: {
    '&:hover': {
      background: fallbackVar(vars.scrollbar.hover.background, 'transparent'),
    },
    '&[data-orientation="vertical"]': { width: fallbackVar(vars.scrollbar.thumb.width, '8px') },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: fallbackVar(vars.scrollbar.thumb.width, '2px'),
    },
  },
});

export const thumb = style({
  flex: 1,
  background: fallbackVar(vars.scrollbar.thumb.background, vars.color.textDisabled),
  borderRadius: fallbackVar(vars.scrollbar.thumb.borderRadius, '6px'),
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
