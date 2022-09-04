import { css } from '@stitches/react';
import { threadStyles } from '../';

export const root = css(threadStyles.content, {
  backgroundColor: '$colors$popoverThreadBackgroundColor',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  zIndex: 9999,
  position: 'relative',
  width: '$sizes$popoverThreadWidth',
});
