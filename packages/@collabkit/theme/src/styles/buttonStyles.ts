import { css } from '@stitches/react';

export const button = css({
  padding: '9px 14px 9px 12px',
  border: '1px solid $neutral6',
  background: 'white',
  color: '$neutral12',
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '20px',
  borderRadius: 11,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',

  variants: {
    isHovering: {
      true: {
        backgroundColor: '$neutral3',
      },
    },
    isOpen: {
      true: {},
      false: {},
    },
  },
});
