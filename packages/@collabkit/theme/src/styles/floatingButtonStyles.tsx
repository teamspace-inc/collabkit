import { css } from '@stitches/react';

export const container = css({
  position: 'fixed',
  right: 20,
  bottom: 20,
});

export const button = css({
  background: '$colors$primaryButtonBackground',
  cursor: 'pointer',
  width: 60,
  borderRadius: 60,
  height: 60,
  display: 'flex',
  userSelect: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 1px 6px 0 rgb(0 0 0 / 5%), 0 2px 32px 0 rgb(0 0 0 / 12%)',
});
