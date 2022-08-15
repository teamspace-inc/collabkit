import { css } from '@stitches/react';
import { threadStyles } from '../';

export const thread = css(threadStyles.thread, {
  backgroundColor: '$neutral1',
  borderRadius: '$radii$1',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  zIndex: 9999,
  position: 'relative',
});
