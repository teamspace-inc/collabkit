import { css } from '@stitches/react';

export const textInlay = css({
  background: '$colors$backgroundColor',
  lineHeight: '30px',
  zIndex: 5,
  display: 'inline-block',
  color: '$colors$secondaryText',
  fontSize: '11px',
  fontWeight: '400',
  padding: '0px 8px',
  position: 'relative',
});

export const indicator = css({
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const line = css({
  background: '$colors$indicatorLineColor',
  height: '1px',
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: '50%',
});
