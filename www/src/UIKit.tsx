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

const SCROLLBAR_SIZE = 6;

const scrollAreaStyles = {
  root: css({
    height: '100%',
    // borderTopRightRadius: 6,
    // borderTopLeftRadius: 6,
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

export const Text = styled('p', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '44px',
  textAlign: 'center',
  letterSpacing: '-0.02em',
  fontFeatureSettings: 'ss04 on',
  margin: 0,

  '@bp1': {
    textAlign: 'left',
    marginTop: 0,
    maxWidth: '90vw',
    minWidth: '90vw',
    fontSize: '24px',
    lineHeight: '32px',
  },
  '@bp2': {
    textAlign: 'center',
    maxWidth: 'unset',
    minWidth: 'unset',
    fontSize: '24px',
    lineHeight: '32px',
  },
});

export const Title = styled('h1', {
  fontFamily: 'Space Grotesk',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '4.66rem',
  lineHeight: '95%',
  textAlign: 'center',
  letterSpacing: '-0.05em',
  color: '#222222',
  margin: '0px',
  zIndex: 1,

  '@bp1': { textAlign: 'left', marginTop: 0, maxWidth: '90vw', minWidth: '90vw', fontSize: '48px' },
  '@bp2': {
    maxWidth: 'unset',
    minWidth: 'unset',
    fontSize: '112px',
    lineHeight: '100px',
    textAlign: 'center',
  },
});

export const Em = styled('em', {
  zIndex: 1,
  fontStyle: 'normal',
});

export const Auth = styled('div', {
  width: '480px',
});

// export const H2 = styled('h2', {
//   fontFamily: 'Inter',
//   fontStyle: 'normal',
//   // fontWeight: 700,
//   fontSize: '3rem',
//   lineHeight: '116%',
//   marginBottom: 0,
//   // letterSpacing: '-0.05em',
//   zIndex: 1,
// });

// export const H3 = styled('h2', {
//   fontFamily: 'Space Grotesk',
//   fontStyle: 'normal',
//   fontWeight: 700,
//   fontSize: '2rem',
//   lineHeight: '116%',
//   letterSpacing: '-0.05em',
//   zIndex: 1,
// });

export const H4 = styled('h2', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  // fontWeight: 700,
  fontSize: '1.75rem',
  lineHeight: '116%',
  marginBottom: 0,
  // letterSpacing: '-0.05em',
  zIndex: 1,
});

export const Button = styled('button', {
  fontFamily: 'Inter',
  padding: '12px 24px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  height: '4rem',
  boxSizing: 'border-box',
  lineHeight: '100%',
  textAlign: 'center',
  letterSpacing: '-0.03em',
  color: '#FFFFFF',
  background: '#222222',
  borderRadius: 100,
  gap: '10px',
  border: 'none',
  zIndex: 1,
  cursor: 'pointer',
  '&:hover': {
    background: 'black',
  },

  '@bp1': { fontSize: '16px', padding: '0px 20px', height: '44px' },
  '@bp2': { fontSize: '19px', lineHeight: '22px', padding: '0px 24px', height: '60px' },
});

export const loading = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const LoadingButton = styled(Button, {
  variants: {
    isLoading: {
      true: {
        '&:after': {
          content: '',
          padding: '0 !important',
          width: '4rem',
          height: '4rem',
          background: 'white',
        },
        width: '4rem',
        height: '4rem',
        animation: `${loading} 1.1s infinite linear`,
        borderTop: '3px solid rgba(0, 0, 0, 0.2) !important',
        borderRight: '3px solid rgba(0, 0, 0, 0.2) !important',
        borderBottom: '3px solid rgba(0, 0, 0, 0.2) !important',
        borderLeft: '3px solid #222 !important',
        transition: 'ease-in 0.2s all',
        padding: '0 !important',
        background: 'white !important',
      },
    },
  },
});

export const Page = styled('section', {
  position: 'relative',
  display: 'flex',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
  paddingTop: '8rem',
  paddingLeft: '5vw',
});

export const Section = styled('section', {
  position: 'relative',
  display: 'flex',
  width: '100vw',
  padding: '0px',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '60px',

  '@bp1': { padding: '100px 0px 100px', gap: '30px' },
  '@bp2': { padding: '200px 0px', gap: '60px' },
});

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

export const Link = styled('a', {
  fontSize: '1.25rem',
  textDecoration: 'none',
  color: 'black',
  '&:hover': {
    textDecoration: 'underline',
  },
});
