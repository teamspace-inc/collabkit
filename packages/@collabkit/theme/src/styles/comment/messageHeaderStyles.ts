import { css } from '@stitches/react';

export const name = css({
  fontSize: '$fontSize$2',
  fontWeight: '$fontWeights$1',
  lineHeight: '$lineHeights$0',
  gap: '12px',
  flexDirection: 'row',
  color: '$colors$primaryText',
  alignItems: 'baseline',
});

export const timestamp = css({
  fontSize: '$fontSize$0',
  color: '$colors$secondaryText',
  textDecoration: 'none',
  fontWeight: '$fontWeights$0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const message = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  flex: 0,
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  color: '$colors$primaryText',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  gap: '4px',
  borderRadius: '$radii$1',
});
