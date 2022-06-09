import { blackA, mauve } from '@radix-ui/colors';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { styled } from '@stitches/react';

const SCROLLBAR_SIZE = 10;

const StyledScrollArea = styled(ScrollArea.Root, {
  width: '100%',
  height: '352px',
  borderRadius: 4,
  overflow: 'hidden',
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const StyledViewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

const StyledScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: mauve.mauve10,
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

const StyledCorner = styled(ScrollArea.Corner, {
  background: blackA.blackA8,
});

export default {
  Corner: StyledCorner,
  Scrollbar: StyledScrollbar,
  Thumb: StyledThumb,
  Viewport: StyledViewport,
  Root: StyledScrollArea,
  ScrollArea,
};
