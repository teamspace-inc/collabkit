import { css } from '@stitches/react';

export const avatar = css({
  width: '24px',
  height: '24px',
  flexShrink: 0,
  aspectRatio: 1,
  borderRadius: '2000px',
  fontSize: '$fontSize$0',
  fontWeight: '700',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '24px',
  cursor: 'inherit',
  userSelect: 'none',
  backgroundColor: '$accent10',
  color: '$neutral1',
  variants: {
    size: {
      32: {
        width: '32px',
        height: '32px',
        lineHeight: '32px',
      },

      28: {
        width: '28px',
        height: '28px',
        lineHeight: '28px',
        fontSize: '$fontSize$2',
      },

      24: {
        width: '24px',
        height: '24px',
        lineHeight: '24px',
      },
    },
  },
});
