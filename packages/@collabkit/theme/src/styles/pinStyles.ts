import { css, keyframes } from '@stitches/react';

export const pin = css({
  width: '$sizes$pin',
  height: '$sizes$pin',
  borderRadius: '$radii$pin',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  border: '$sizes$pinBorderWidth solid $colors$pinBorderColor',
  cursor: 'pointer',
  position: 'relative',

  variants: {
    effect: {
      flat: {},
      sticker: {
        filter:
          'drop-shadow(0 1px 0px rgba(0, 0, 0, 0.1))  drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15))',
      },
    },
  },
});

export const pinContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  position: 'relative',
});

export const floatingThreadContainer = css({
  width: '$sizes$threadPreviewWidth',
});

const loadingFade = keyframes({
  '0%': { opacity: 0, transform: 'scale(1)' },
  '50%': { opacity: 1, transform: 'scale(1.2)' },
  '100%': { opacity: 0, transform: 'scale(1)' },
});

export const typingDot = css({
  width: '5px',
  height: '5px',
  background: '$colors$neutral1',
  borderRadius: '5px',
  opacity: 0,
  animation: `${loadingFade} 1.5s infinite`,

  '&:nth-child(1)': {
    animationDelay: '0s',
  },
  '&:nth-child(2)': {
    animationDelay: '0.25s',
  },
  '&:nth-child(3)': {
    animationDelay: '0.5s',
  },
});

export const typingDots = css({
  width: '28px',
  height: '28px',
  display: 'flex',
  gap: '2px',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});
