import { css } from '@stitches/react';
import { threadStyles } from '../';

export const root = css(threadStyles.content, {
  boxSizing: 'border-box',
  backgroundColor: '$colors$popoverThreadBackgroundColor',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  width: '$sizes$popoverThreadWidth',
  background: '#FFFFFF',
  /* Neutral Shades/BG3 */

  border: '1px solid #E3E9ED',
  /* 📖 Elevation - Standard */
  boxShadow: '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
  borderRadius: '$radii$popoverThread',
});

export const previewThreadRoot = css(root, {
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
});
