import { style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

const arrowSize = 6;

export const root = style({
  backgroundColor: vars.color.textPrimary,
  color: vars.color.background,
  fontSize: vars.text.small.fontSize,
  lineHeight: vars.text.small.lineHeight,
  letterSpacing: vars.text.small.letterSpacing,
  padding: `${vars.space[2]} ${vars.space[2]}`,
  borderRadius: '6px',
  boxSizing: 'border-box',
  width: 'max-content',
  maxWidth: 'calc(100vw - 10px)',
  selectors: {
    '&:before': {
      position: 'absolute',
      bottom: -arrowSize,
      content: ' ',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderTop: `${arrowSize}px solid ${vars.color.textPrimary}`,
    },
  },
});
