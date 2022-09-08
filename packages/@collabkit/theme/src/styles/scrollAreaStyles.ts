import { css } from '@stitches/react';

const SCROLLBAR_SIZE = 6;

export const root = css({
  width: '100%',
  height: '100%',
  // borderTopRightRadius: 6,
  // borderTopLeftRadius: 6,
  overflow: 'hidden',
});

export const viewport = css({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const scrollbar = css({
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$neutral3' },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

export const thumb = css({
  flex: 1,
  background: '$neutral10',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
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
});

export const corner = css({
  background: '$neutral8',
});
