import { css } from '@stitches/react';
import { threadStyles } from '../';

export const thread = css(threadStyles.thread, {
  backgroundColor: '$colors$popoverThreadBackgroundColor',
  backgroundColor: '$colors$backgroundColor',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  zIndex: 9999,
  position: 'relative',
  width: '$sizes$popoverThreadWidth',
});
