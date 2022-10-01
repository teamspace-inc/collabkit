import { style } from '@vanilla-extract/css';
import { vars } from './themes.css';

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 24,
  width: 24,
  cursor: 'pointer',
  userSelect: 'none',
  pointerEvents: 'all',
  borderRadius: '4px',
  color: vars.color.textPrimary,
  background: vars.iconButton.background,

  selectors: {
    '&:active': {
      background: vars.iconButton.active.background,
    },
    '&:hover': {
      background: vars.iconButton.hover.background,
    },
  },
});
