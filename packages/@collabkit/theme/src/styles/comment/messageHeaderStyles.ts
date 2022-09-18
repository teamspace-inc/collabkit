import { css } from '@stitches/react';

export const name = css({
  fontSize: '$fontSize$2',
  fontWeight: '$fontWeights$profileNameText',
  lineHeight: '$lineHeights$0',
  flexDirection: 'row',
  color: '$colors$primaryText',
  alignItems: 'baseline',
});

export const root = css({
  display: 'flex',
  flex: '1',
  gap: '4px',
  flexDirection: 'row',
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
