import { css } from '@stitches/react';

export const avatar = css({
  width: '$sizes$avatar',
  height: '$sizes$avatar',
  flexShrink: 0,
  aspectRatio: 1,
  borderRadius: '$radii$avatar',
  fontSize: '$fontSize$0',
  fontWeight: '700',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '$sizes$avatar',
  cursor: 'inherit',
  userSelect: 'none',
  backgroundColor: '$accent10',
  color: '$neutral1',
});

export const name = css({
  fontSize: '$fontSize$2',
  fontWeight: '$fontWeights$profileNameText',
  lineHeight: '$lineHeights$0',
  flexDirection: 'row',
  color: '$colors$primaryText',
  alignItems: 'baseline',
});
