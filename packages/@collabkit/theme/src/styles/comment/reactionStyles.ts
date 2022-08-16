import { css } from '@stitches/react';

export const reactions = css({
  background: 'white',
  display: 'inline-flex',
  flex: 1,
  gap: 3,
  position: 'absolute',
  right: 5,
  bottom: -15,
  fontSize: 15,
  lineHeight: '15px',
  borderRadius: '15px',
  width: 'auto',
  padding: '2px 3px',
  boxShadow: `0px 1px 0px rgba(0,0,0,0.075), 0px 1px 3px rgba(0,0,0,0.05)`,
  cursor: 'pointer',
});
