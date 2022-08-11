import { createStitches, keyframes } from '@stitches/react';
export const { styled, css, theme } = createStitches({
  theme: {
    colors: {},
  },
  media: {
    bp1: '(min-width: 320px)',
    bp2: '(min-width: 720px)',
  },
});

export const Grid = styled('div', {
  display: 'grid',
});

export const VStack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const HStack = styled('div', {
  display: 'flex',
  flexDirection: 'row',
});

export const Text = styled('p', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: '140%',
  letterSpacing: '-0.03em,',
  zIndex: 1,
});

export const Title = styled('h1', {
  fontFamily: 'Space Grotesk',
  fontFeatureSettings: 'ss04',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '5.5rem',
  lineHeight: '95%',
  textAlign: 'center',
  letterSpacing: '-0.05em',
  color: '#222222',
  margin: '4rem 0 2rem',
  zIndex: 1,

  '@bp1': { marginTop: 0, maxWidth: '90vw', minWidth: '90vw', fontSize: '4rem' },
  '@bp2': { maxWidth: 'unset', minWidth: 'unset', fontSize: '7rem' },
});

export const Em = styled('em', {
  zIndex: 1,
  fontStyle: 'normal',
});

export const Auth = styled('div', {
  width: '480px',
});

export const H2 = styled('h2', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  // fontWeight: 700,
  fontSize: '3rem',
  lineHeight: '116%',
  marginBottom: 0,
  // letterSpacing: '-0.05em',
  zIndex: 1,
});

export const H3 = styled('h2', {
  fontFamily: 'Space Grotesk',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: '116%',
  letterSpacing: '-0.05em',
  zIndex: 1,
});

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
  padding: '1rem 2rem',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '1.25rem',
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
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
