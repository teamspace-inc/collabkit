import { style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

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
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '20px solid #f00',
    },
  },
});
