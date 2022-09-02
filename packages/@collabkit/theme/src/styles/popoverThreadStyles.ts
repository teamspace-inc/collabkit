import { css } from '@stitches/react';
import { threadStyles } from '../';

export const thread = css(threadStyles.thread, {
  backgroundColor: '$colors$popoverThreadBackgroundColor',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  zIndex: '9999 !important',
  position: 'relative',
  width: '$sizes$popoverThreadWidth',
});
