import { createStitches, keyframes } from '@stitches/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as ui from './styles/UIKit.css';

export const { styled, css, theme } = createStitches({
  theme: {
    colors: {},
  },
  media: {
    bp1: '(min-width: 320px)',
    bp2: '(min-width: 720px)',
  },
});

export const H2 = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <h2 className={ui.h2} {...props} />
);

export const H3 = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <h3 className={ui.h3} {...props} />
);

export const VSpace = (props: { h: number }) => <div style={{ height: props.h }} />;
export const V8 = () => <VSpace h={8} />;
export const V12 = () => <VSpace h={12} />;
export const V24 = () => <VSpace h={24} />;

const SCROLLBAR_SIZE = 6;

const scrollAreaStyles = {
  root: css({
    height: '100%',
    overflow: 'hidden',
  }),

  viewport: css({
    height: '100%',
    borderRadius: 'inherit',
  }),

  scrollbar: css({
    display: 'flex',
    // ensures no selection
    userSelect: 'none',
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: 'none',
    padding: '6px 4px 6px 4px',
    transition: 'background 160ms ease-out',
    '&:hover': { background: 'rgba(255,255,255,0.04)' },
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: SCROLLBAR_SIZE,
    },
  }),

  thumb: css({
    flex: 1,
    background: 'rgba(255,255,255,0.16)',
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
  }),

  corner: css({
    background: 'blue',
  }),
};

export const ScrollAreaRoot = styled(ScrollArea.Root, scrollAreaStyles.root);
export const ScrollAreaViewport = styled(ScrollArea.Viewport, scrollAreaStyles.viewport);
export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, scrollAreaStyles.scrollbar);
export const ScrollAreaThumb = styled(ScrollArea.Thumb, scrollAreaStyles.thumb);
export const ScrollAreaCorner = styled(ScrollArea.Corner, scrollAreaStyles.corner);

export const Em = styled('em', {
  zIndex: 1,
  fontStyle: 'normal',
});

export const Auth = styled('div', {
  width: '480px',
});

export const loading = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

// export const LoadingButton = styled(Button, {
//   variants: {
//     isLoading: {
//       true: {
//         '&:after': {
//           content: '',
//           padding: '0 !important',
//           width: '4rem',
//           height: '4rem',
//           background: 'white',
//         },
//         width: '4rem',
//         height: '4rem',
//         animation: `${loading} 1.1s infinite linear`,
//         borderTop: '3px solid rgba(0, 0, 0, 0.2) !important',
//         borderRight: '3px solid rgba(0, 0, 0, 0.2) !important',
//         borderBottom: '3px solid rgba(0, 0, 0, 0.2) !important',
//         borderLeft: '3px solid #222 !important',
//         transition: 'ease-in 0.2s all',
//         padding: '0 !important',
//         background: 'white !important',
//       },
//     },
//   },
// });

// export const Page = styled('section', {
//   position: 'relative',
//   display: 'flex',
//   width: '100vw',
//   overflow: 'hidden',
//   flexDirection: 'column',
//   paddingTop: '8rem',
//   paddingLeft: '5vw',
// });

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  width: '90vw',
  padding: '0 5vw',
  position: 'fixed',
  zIndex: 2,
  maxWidth: '1352px',
});

export const Link = (props: React.ComponentPropsWithoutRef<'a'>) => (
  <a className={ui.a} {...props} />
);
