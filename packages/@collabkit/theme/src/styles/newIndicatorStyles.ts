import { css } from '@stitches/react';

export const textInlay = css({
  background: '$colors$backgroundColor',
  zIndex: 5,
  display: 'inline-block',
  color: '$colors$indicatorText',
  fontSize: '$fontSize$indicatorText',
  fontWeight: '$fontWeights$indicatorText',
  lineHeight: '$lineHeights$indicatorText',
  padding: '0px 8px',
  position: 'relative',
});

export const indicator = css({
  height: '$lineHeights$indicatorText',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const line = css({
  background: '$colors$indicatorLineColor',
  height: '1px',
  position: 'absolute',
  left: '$padding$commentLeft',
  right: '$padding$commentRight',
  bottom: '50%',
});
