import { sand, whiteA } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import * as ScrollAreaBase from '@radix-ui/react-scroll-area';

const SCROLLBAR_SIZE = 10;

export const ScrollArea = styled(ScrollAreaBase.Root, {
  width: '100%',
  overflow: 'hidden',
  borderBottomLeftRadius: '$radii$2',
  borderBottomRightRadius: '$radii$2',
});

export const ScrollAreaViewport = styled(ScrollAreaBase.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const Scrollbar = styled(ScrollAreaBase.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: whiteA.whiteA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: whiteA.whiteA8 },
  variants: {
    orientation: {
      vertical: {
        width: SCROLLBAR_SIZE,
      },
      horizontal: {
        flexDirection: 'column',
        height: SCROLLBAR_SIZE,
      },
    },
  },
});

export const ScrollAreaThumb = styled(ScrollAreaBase.Thumb, {
  flex: 1,
  background: sand.sand10,
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
    minWidth: '$size3',
    minHeight: '$size3',
  },
});
