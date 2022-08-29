import { css } from '@stitches/react';

export const wrapper = css({
  position: 'absolute',
  inset: 0,
});

// TODO: find the correct color and add to theme
const INDICATOR_COLOR = '#e7d777';

export const indicator = css({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '0 16px 16px 0',
  borderColor: `transparent ${INDICATOR_COLOR} transparent transparent`,
});
